const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength: [3, "Username must be at least 3 characters long"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength: [11, "Email must be at least 11 characters long"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: [5, "Password must be at least 5 characters long"]
    }
    
})

const user = mongoose.model("user",userSchema)

module.exports = user;