const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [20, "Username cannot exceed 20 characters"],
        match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
    },
    authType: {
        type: String,
        required: true,
        enum: ['local', 'google'],
        default: 'local'
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return this.authType === 'local';
        },
        minlength: [8, "Password must be at least 8 characters long"],
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, 
            "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"
        ]
    },
    confirmPassword: {
        type: String,
        required: function() {
            return this.authType === 'local';
        },
        minlength: [8, "Password must be at least 8 characters long"],
        validate: {
            validator: function(value) {
                return this.authType === 'google' || value === this.password;
            },
            message: "Passwords do not match"
        }
    },
}, {
    timestamps: true
});

const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required()
            .messages({
                'string.empty': 'Username is required',
                'string.min': 'Username must be at least 3 characters long',
                'string.max': 'Username cannot exceed 20 characters',
                'string.alphanum': 'Username can only contain letters and numbers'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please enter a valid email address'
            }),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
            .required()
            .messages({
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.base': 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
            }),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'string.empty': 'Please confirm your password',
                'any.only': 'Passwords do not match'
            })
    });
    return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };