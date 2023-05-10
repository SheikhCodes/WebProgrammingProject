// Import required modules and dependencies
const { verify } = require("jsonwebtoken");
const PrivateKey = process.env.private_key;
const Course = require("../model/course");
const bufferToString = require("../utils/bufferToString");
const Admin = require("../model/admin");
const { createToken } = require("../utils/createToken");
const cloudinary = require("../utils/cloud");
const Material = require("../model/material");
const Assessment = require("../model/assesments");
const Learner = require("../model/learner");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { getCourse } = require("./learner.controller");

// Exported module containing various functions
module.exports = {
  // Function for user sign up
  signUp: catchAsync(async (req, res, next) => {
    const newAdmin = await Admin.create({ ...req.body });
    console.log("newAdmin", newAdmin);
    createToken(newAdmin);
    await newAdmin.save();
    res.status(200).json({
      status: "success",
      data: newAdmin,
      message: "Admin created successfully",
      user: newAdmin.name,
    });
  }),

  // Function for user sign in
  signIn: catchAsync(async (req, res, next) => {
    console.log("req.body", req.body);
    const { email, password } = req.body;
    const foundAdmin = await Admin.findbyEmailandPassword(email, password);
    createToken(foundAdmin);
    foundAdmin.save();
    res.status(200).json({
      status: "success",
      data: foundAdmin,
      message: "Admin signed in successfully",
      user: foundAdmin.name,
    });
  }),

  // Function for user sign out
  signOut: async (req, res, next) => {
    console.log("req.body", req.body);
    console.log("req.body", req.headers.authorization);
    const token = req.headers.authorization;
    const foundAdmin = await Admin.findOneAndUpdate(
      { accesstoken: token },
      { accesstoken: null }
    );
    if (!foundAdmin) {
      return next(new AppError("Admin not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: foundAdmin,
      message: "Admin signed out successfully",
    });
  },

  // Function for creating a new course
  createCourse: catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = verify(token, PrivateKey);
    const newCourse = await Course.create({ ...req.body, admin: decoded.id });
    await Admin.findByIdAndUpdate(decoded.id, {
      $push: { course: newCourse._id },
    });
    res.status(200).json({
      status: "success",
      data: newCourse,
      message: "Course created successfully",
    });
  }),

  // Function for creating a new material
  createMaterial: catchAsync(async (req, res, next) => {
    console.log("req.body", req.body.name);
    const { name, data } = req.files.file;
    const token = req.headers.authorization;
    const originalName = req.body.name;
    const decoded = verify(token, PrivateKey);
    console.log("name", originalName);
    console.log("data", data);
    const dataURI = bufferToString(name, data);
    const secure_url = await cloudinary.uploader.upload_large(
      dataURI,
      { resource_type: "raw" },
      function (error, result) {
        console.log("result", result, error);
      }
    );
    console.log("secure_url", secure_url.secure_url);

    //create material
    const newMaterial = await Material.create({
      name: orignalName,
      materialUrl: secure_url.secure_url,
      admin: decoded.id,
    });
    if (!newMaterial) {
      return next(new AppError("Material not created", 404));
    }
    res.status(200).json({
      status: "success",
      data: newMaterial,
      message: "Material created successfully",
    });
  }),

  addMaterial: catchAsync(async (req, res, next) => {
    console.log("req.body", req.body, req.params.id);
    const courseId = req.params.id;
    const newMaterial = await Material.find({ _id: req.body._id });
    console.log("newMaterial", newMaterial);
    if (newMaterial.length === 0) {
      return next(new AppError("Material not found", 404));
    }
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      $addToSet: { material: newMaterial[0]._id },
    });
    console.log("course", updatedCourse);
    if (!updatedCourse) {
      return next(new AppError("Course not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: newMaterial,
      message: "Material created successfully",
      course: updatedCourse,
    });
  }),
  getCourses: catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = verify(token, PrivateKey);
    const courses = await Course.find({ admin: decoded.id });
    res.status(200).json({
      status: "success",
      data: courses,
      message: "Courses fetched successfully",
    });
  }),
  getMaterials: catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = verify(token, PrivateKey);
    const materials = await Material.find({ admin: decoded.id });
    res.status(200).json({
      status: "success",
      data: materials,
      message: "Materials fetched successfully",
    });
  }),
  deleteMaterial: catchAsync(async (req, res, next) => {
    console.log("Material");
    const token = req.headers.authorization;
    const decoded = verify(token, PrivateKey);
    const materialId = req.params.id;
    const material = await Material.findByIdAndDelete(materialId);
    res.status(200).json({
      status: "success",
      data: material,
      message: "Material deleted successfully",
    });
  }),
  deleteCourse: catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = verify(token, PrivateKey);
    const courseId = req.params.id;
    const course = await Course.findByIdAndDelete(courseId);
    res.status(200).json({
      status: "success",
      data: course,
      message: "Course deleted successfully",
    });
  }),
  createAssessment: catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = verify(token, PrivateKey);
    const newAssessment = await Assessment.create({
      ...req.body,
      admin: decoded.id,
    });
    if (!newAssessment) {
      return next(new AppError("Assessment not created", 404));
    }
    res.status(200).json({
      status: "success",
      data: newAssessment,
      message: "Assessment created successfully",
    });
  }),
  getAssessments: catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = verify(token, PrivateKey);
    const assessments = await Assessment.find({ admin: decoded.id });
    res.status(200).json({
      status: "success",
      data: assessments,
      message: "Assessments fetched successfully",
    });
  }),
  deleteAssessment: catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const Id = req.params.id;
    const assesment = await Assessment.findByIdAndDelete(Id);
    console.log(assesment);
    if (!assesment) {
      return next(new AppError("Assessment not found", 500));
    }
    res.status(200).json({
      status: "success",
      data: assesment,
      message: "Course deleted successfully",
    });
  }),
  addUserToCourse: catchAsync(async (req, res, next) => {
    console.log("req.body", req.body, req.params.id);
    const courseId = req.params.id;
    const newLearner = await Learner.find({ _id: req.body._id });
    console.log("newMaterial", newLearner);
    if (newLearner.length === 0) {
      return next(new AppError("Material not found", 404));
    }
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      $addToSet: { learners: newLearner[0]._id },
    });
    console.log("course", updatedCourse);
    if (!updatedCourse) {
      return next(new AppError("Course not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: newLearner,
      message: "Learner linked successfully",
      course: updatedCourse,
    });
  }),
};
