//connect with database...or db configuration
const mongoose = require("mongoose")

// const connection = mongoose.connect("mongodb://0.0.0.0/men").then(()=>{
//     console.log("connected to database")
// })

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to DB");
        
    })
}

module.exports = connectToDB;