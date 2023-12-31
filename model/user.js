const mongoose = require("mongoose");
const Joi = require("joi")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:255
    }
})

userSchema.methods.generateAuthToken = function(){
    const token  = jwt.sign({_id:this._id},process.env.SECRET);
    return token;
}


const User = mongoose.model("user",userSchema);

const validateUser = (user)=>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(25).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required()
    })

    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;