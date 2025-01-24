const mongoose = require('mongoose')
const env = require('dotenv').config()
const da = 5

const connectDB = async()=>{
    try {        
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        if(connect){
            console.log("DB connected");
        }else{
            throw new Error("DB Connection failed")
        }
        
        
    } catch (error) {
        console.log("DB connection error"+error.message);
        process.exit(1);
    }
}

module.exports = connectDB