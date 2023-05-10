const {Schema ,model} = require('mongoose')

const materialModel = new Schema({
    name: {
        type: String,
        required: true
    },
    materialUrl: {
        type: String,
        required: true,
        trim: true
    },
    admin : {
        type : Schema.Types.ObjectId,
        ref : 'Admin'
    },
})

const MaterialModel = model('Material', materialModel)
module.exports = MaterialModel