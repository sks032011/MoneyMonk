// filepath: c:\Users\HP-PC\Desktop\backend\ExpenseTracker\backend\config\database.js
const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
         
        await mongoose.connect(process.env.MONGODB_URI,{});
        console.log('MongoDB Connected...');
    } catch (error) {
console.log("mongodb connection failed", error.message, error.cause);        process.exit(1);
    }
}
module.exports=connectDB;