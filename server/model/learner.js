const {Schema, model} = require("mongoose");
const {hash, compare} = require("bcryptjs");
const validator = require("validator");

const learnerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value) => {
                    return validator.isEmail(value);
                },
                message: value => `${value} is not a valid email`
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            trim: true,
            validate: {
                validator: (value) => {
                    return validator.isLength(value, {min: 4});
                }
            }
        },
        accessToken: {
            type: String,
            required: false
        },
        refreshToken: {
            type: String,
            required: false
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    },
    {timestamps: true}
);

learnerSchema.statics.findbyEmailandPassword = async (email, password) => {
    try {
        const foundUser = await User.findOne({email});
        if (!foundUser) {
            throw new Error("User not found");
        }
        const isMatch = await compare(password, foundUser.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        return foundUser;
    }
    catch (error) {
        throw error;
    }
}

learnerSchema.pre("save", async function (next) {

    try {
        if (this.isModified("password")) {
            const hashedPassword = await hash(this.password, 10);
            this.password = hashedPassword;
            next();
        }
    }
    catch (error) {
        console.error(error)
        next(error)
    }
}
);

const User = model("User", learnerSchema);
module.exports = User;
