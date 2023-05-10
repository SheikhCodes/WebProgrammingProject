const Course = require('../model/course');
const Material = require('../model/material');
const Assesment = require('../model/assesments');
const Admin = require('../model/admin');
const Learner = require('../model/learner');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { verify } = require('jsonwebtoken');
const PrivateKey = process.env.private_key;
const { populate } = require('../model/course');
const { stripe } = require('stripe');
const { createToken } = require('../utils/createToken');
('sk_test_51HUEyCDOfBXcEuEsTZCdBB0EyPYnqaNdEve90jIbZL5aMuJNfLFFHeMtqend6JfcCFOxKnRvfNh4b9y0EzZsnfNk00YehuaxbT')

module.exports = {
    signUp: catchAsync(async (req, res, next) => {
        console.log("USER", req.body);
        const newLearner = await Learner.create({...req.body});
        createToken(newLearner)
        await newLearner.save();
        res.status(200).json({
            status: 'success',
            user : 'Learner',
            data: newLearner,
            message: 'Learner created successfully'
        });
    }
    ),
    signIn: catchAsync(async (req, res, next) => {
        console.log(req.body)
        const { email, password } = req.body;
        
        const foundLearner = await Learner.findbyEmailandPassword(email, password);
        createToken(foundLearner)
        await foundLearner.save();
        res.status(200).json({
            status: 'success',
            user: 'Learner',
            message: 'Learner logged in successfully',
            data: foundLearner
        });
    }),
    signOut: catchAsync(async (req, res, next) => {
        const  Token  = req.headers.authorization;
        console.log("Token", Token);
        const foundLearner = await Learner.findOneAndUpdate({ accessToken:Token }, { accessToken: null});
        console.log("foundLearner", foundLearner);
        if(!foundLearner){ return next(new AppError('Learner not found', 404)) }
        return res.status(200).json({
            status: 'success',
            message: 'Learner logged out successfully'
        });
    }),

    getCourses: catchAsync(async (req, res, next) => {
        const courses = await Course.find({});
        res.status(200).json({
            status: 'success',
            data: courses,
            message: 'Courses fetched successfully'
        });
    }
    ),
    getCourse: catchAsync(async (req, res, next) => {
        const course = await Course.findById(req.params.id).populate('Material').populate('Admin');
        if(!course){ return next(new AppError('Course not found', 400)) }
        res.status(200).json({
            status: 'success',
            data: course,
            message: 'Course fetched successfully'
        });
    }),
    
    buyCourse: catchAsync(async (req, res, next) => {
        const accessToken = req.headers.authorization;
        const foundLearner = await verify(accessToken, PrivateKey);
        const courseId = req.params.id;
        
        const { amount, source, receipt_email } = req.body;
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source,
            receipt_email
        });

        if(!charge) throw new Error('Charge failed');

        const fLearner = await Learner.findByIdAndUpdate(foundLearner._id, { $push: { course: foundLearner._id } }, { new: true });
        if(!fLearner){ return next(new AppError('Course not found', 400)) }
        const foundCourse = await Course.findByIdAndUpdate(courseId, { $inc: { revenue: req.body.amount} }, { new: true });
        if(!foundCourse){ return next(new AppError('Course not found', 400)) }
        await Admin.findByIdAndUpdate(foundCourse.admin, { $inc: { revenue: req.body.amount} }, { new: true });
        res.status(200).json({
            status: 'success',
            data: fLearner,
            charge: charge,
            message: 'Course purchased successfully'
        });
    }),
    getUser: catchAsync(async (req, res, next) => {
        const accessToken = req.headers.authorization;
        const foundLearnerId = await verify(accessToken, PrivateKey);
        if(foundLearnerId == null || foundLearnerId == undefined){ return next(new AppError('Learner not found', 400)) }
        const foundLearner = await Learner.findById(foundLearnerId._id).populate('course');
        const foundAdmin = await Admin.findById(foundLearner._id).populate({ path: 'course',model:'Course', populate: { path: 'material',model: 'Material' } });
        if(!foundLearner && !foundAdmin){ return next(new AppError('Learner not found', 400)) }
        if (foundLearner) {
            res.status(200).json({
                status: 'success',
                user: 'Learner',
                data: foundLearner,
                message: 'Learner fetched successfully'
            });
        }
        if (foundAdmin) {
            res.status(200).json({
                status: 'success',
                user: 'Admin',
                data: foundAdmin,
                message: 'Admin fetched successfully'
            });
        }
    }),

    getAllLearners: catchAsync(async (req, res, next) => {
        const learners = await Learner.find({});
        res.status(200).json({
            status: 'success',
            data: learners,
            message: 'Learners fetched successfully'
        });
    }),

    deleteLearner: catchAsync(async (req, res, next) => {
        console.log("Learner", req.params.id);
        const deletedLearner = await Learner.findByIdAndDelete(req.params.id);
        console.log("deletedLearner", deletedLearner);
        if(!deletedLearner){ console.log("Learner not found"); return next(new AppError('Learner not found', 400)) }
        res.status(200).json({
            status: 'success',
            data: deletedLearner,
            message: 'Learner deleted successfully'
        });
    })


}