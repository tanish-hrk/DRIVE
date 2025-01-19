const express = require("express")
const app = express()
const userModel = require("./models/user")
const dbconnection = require("./config/db")

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})