const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/register",(req,res)=>{
    res.render("register");
})

router.post("/register",
    body("email").trim().isEmail().isLength({min:11}),
    body("password").trim().isLength({min:5}),
    body("username").trim().isLength({min:3}), async (req,res)=>{
       
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // return res.send("Invelid data")
            return res.status(400).json({
                errors: errors.array(),
                message:"Invalid data"
            })
        }
        
        const {email, username, password} = req.body;
        const NewUser = await userModel.create({
            email,
            username,
            password: await bcrypt.hash(password, 10)
        })
        res.json(NewUser)

    console.log(req.body)
    res.send("User registered")
})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/login",
    body("password").trim().isLength({min:5}),
    body("username").trim().isLength({min:3}),
    async (req,res)=>{
       
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:"Invalid data"
            })
        }

    const {username, password} = req.body;
    const user = await userModel.findOne(
        {
            username:username
        })

    if(!user){
        return res.status(400).json({message:"Invalid Username & Pasword"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Username & Pasword"})
    }
    const token = jwt.sign({
        userid:user._id,
        email:user.email,
        username:user.username,
    },
        process.env.JWT_SECRET,)
        res.json({
            token
        })
})

module.exports = router;