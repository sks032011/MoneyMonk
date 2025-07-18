const   Expense= require("../models/Expenses");
const xlsx = require("xlsx");


exports.addExpense=async(req,res)=>{
    
    const userId=req.user._id;
   try {
     const {amount,icon,category,date}=req.body;
     if(!amount || !category ){
         return res.status(400).json({message:"Please provide all the required fields"})
     }
     const newExpense=new Expense({
         userId,
         amount,
         icon,
         category,
         date:new Date(date) // convert the date to a date object so that it can be saved in the database otherwise it will be saved as a string 
     })
     await newExpense.save();// save the Expense to the database
     res.status(201).json({message:"Expense added successfully",data:newExpense})
   } catch (error) {
     res.status(500).json({message:"Internal server error",error:error.message})

   }


}

exports.getAllExpense=async(req,res)=>{
  const userId=req.user._id;
  try {
    const expense=await Expense.find({userId}).sort({date:-1});
    if(!expense){
      return res.status(404).json({message:"No Expense found"})
    }
    res.status(200).json({message:"Expense fetched successfully",data:expense})
  } catch (error) {
    res.status(500).json({message:"Internal server error",error:error.message})
  }
}
exports.deleteExpense=async(req,res)=>{
  const userId=req.user._id;
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Expense deleted successfully"})
  } catch (error) {
    res.status(500).json({message:"Internal server error",error:error.message})
  }
}

//EXCEL DNLD FEATURE
exports.downloadExpense=async(req,res)=>{
    const userId =req.user._id;
    try {
    const expense =await Expense.find({userId}).sort({date:-1});
    //prepare the data for excel
    const data=expense.map((item)=>({
        
      Category:item.category,
        Amount:item.amount,
        Date:item.date 
    }))
    
    //create a new workbook
    const workbook=xlsx.utils.book_new();
    //create a new worksheet
    const worksheet=xlsx.utils.json_to_sheet(data);
    //append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook,worksheet,"Expense");
    //write the workbook to a file
    xlsx.writeFile(workbook,"expense_details.xlsx");
    res.download("expense_details.xlsx");


  } catch (error) {
    res.status(500).json({message:"Internal server error",error:error.message})
  }
}