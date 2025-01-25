const express = require("express")
const app = express()
// const userModel = require("./models/user.models.js")
const connectToDB = require("./config/db")
const userRouter = require("./routes/user.routes")
const dotenv = require("dotenv")
dotenv.config();

connectToDB();

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',userRouter)


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})