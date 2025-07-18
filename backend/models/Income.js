const mongoose= require('mongoose');
const User = require('./User');
const IncomeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
    ,amount:{
        type:Number,
        required:true
    },
    icon:{
        type:String
    },
    category:{
        type:String,
        required:true
    },// freela? , salary , income
    date:{
        type:Date,
        default:Date.now
    },
},{timestamps:true})

module.exports=mongoose.model("Income",IncomeSchema);
