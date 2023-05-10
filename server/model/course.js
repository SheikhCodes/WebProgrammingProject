   
const {Schema, model} = require("mongoose");

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    price : {
      type: Number,
      required: true,
      trim: true
    },
    material :[ {
      type : Schema.Types.ObjectId,
      ref : 'Material'
    }],
    admin : {
      type : Schema.Types.ObjectId,
      ref : 'Admin'
    },
    learners : [{
      type : Schema.Types.ObjectId,
      ref : 'Learner'
    }],
    revenue : {
      type : Number,
      required : false,
      default : 0
  }    
  }
);

const CourseModel = model("Course", courseSchema);
module.exports = CourseModel;