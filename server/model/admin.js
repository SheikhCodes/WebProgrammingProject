const {Schema,model} = require('mongoose')
const {hash, compare} = require('bcryptjs')
const validator = require('validator')

const adminSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator : (value) => {
                return validator.isEmail(value)
            },
            message: `{VALUE} is not a valid email`
        }
    },
    password : {
        type: String,
        required: true,
        minLength: 4,
        trim: true,
        validate: {
            validator : (value) => {
                return validator.isLength(value,{min:4})
            }
        }
    },
    accessToken : {
        type: String,
        required: false
    },
    refreshToken : {
        type: String,
        required: false
    },
    course : [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    revenue : {
        type : Number,
        required : false
    }
},{timestamps: true})


adminSchema.statics.findbyEmailandPassword = async (email,password) => {
    console.log("email",email);
    console.log("password",password);
    try {
        const foundUser = await User.findOne({email});
        if(!foundUser){
            throw new Error('User not found')
        }
        console.log("foundUser",await compare('12345',foundUser.password));
        const isMatch = await compare(password,foundUser.password)
        
        return foundUser;
    } catch (error) {
        throw error;
    }
}

adminSchema.pre('save', async function(next){
    try {
        if(this.isModified('password')){
            const hashedPassword = await hash(this.password,10)
            User.password =  hashedPassword
            next();
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

const User = model('Admin', adminSchema)
module.exports = User
        


