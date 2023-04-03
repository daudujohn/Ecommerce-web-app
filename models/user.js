const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        minLength: 2,
        maxLength: 64,
        required: true,
        trim: true
    }, 
    email: {
        type: String, 
        minLength: 2,
        maxLength: 128,
        required: true, 
        index: true, 
        lowercase: true, 
        trim: true
    }, 
    password: {
        type: String, 
        minLength: 7, 
        required: true, 
    }, 
    isDeleted: {
        type: Boolean, 
        default: false
    }, 
    isActive: {
        type: Boolean, 
        default: true
    }
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


const User = mongoose.model('User', userSchema)

const validateUser = function (user){
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(64).required(), 
        email: Joi.string().trim().lowercase().email().min(2).max(128).required(), 
        password: Joi.string().required(), 
        repeat_password: Joi.string().required(), 
        isDeleted: Joi.boolean(),
        isActive: Joi.boolean()
    })

    return schema.validate(user, {abortEarly: false})
}

exports.User = User;
exports.validateUser = validateUser;