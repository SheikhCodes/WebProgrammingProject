const {Schema, model} = require("mongoose");


const assesmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true,
            trim: true
        },
        answer1: {
            type: String,
            required: true,
            trim: true
        },
        answer2: {
            type: String,
            required: true,
            trim: true
        },
        answer3: {
            type: String,
            required: true,
            trim: true
        },
        answer4: {
            type: String,
            required: true,
            trim: true
        },
        correctAnswer: {
            type: String,
            required: true,
            trim: true
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'Admin'
        },
    }
)
const AssesmentModel = model('Assesment', assesmentSchema)
module.exports = AssesmentModel;
