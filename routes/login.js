const { User } = require('../model/user');
const express = require('express');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const json = require('jsonwebtoken')

const router = express.Router();


router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid User")

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send("Invalid email or password")

    const token = user.generateAuthToken();
    res.send(token);
})

let validate = (user)=>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(20).required()
    })

    return schema.validate(user);
}

module.exports = router;