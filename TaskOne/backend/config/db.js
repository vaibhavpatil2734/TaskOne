const mongoose = require("mongoose");


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MongoDB connected...")
    } catch (error) {
        console.log("mongoDB connection error ",error)
    }
}

module.exports = connectDB;