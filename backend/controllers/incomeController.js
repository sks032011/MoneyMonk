const   Income= require("../models/Income");
const xlsx = require("xlsx");
exports.addIncome=async(req,res)=>{
    
    const userId=req.user._id;
   try {
     const {amount,icon,category,date}=req.body;
     if(!amount || !category ){
         return res.status(400).json({message:"Please provide all the required fields"})
     }
     const newIncome=new Income({
         userId,
         amount,
         icon,
         category,
         date:new Date(date) // convert the date to a date object so that it can be saved in the database otherwise it will be saved as a string 
     })
     await newIncome.save();// save the income to the database
     res.status(201).json({message:"Income added successfully",data:newIncome})
   } catch (error) {
     res.status(500).json({message:"Internal server error",error:error.message})

   }


}

exports.getAllIncome=async(req,res)=>{
  const userId=req.user._id;
  try {
    const income=await Income.find({userId}).sort({date:-1});
    if(!income){
      return res.status(404).json({message:"No income found"})
    }
    res.status(200).json({message:"Income fetched successfully",data:income})
  } catch (error) {
    res.status(500).json({message:"Internal server error",error:error.message})
  }
}
exports.deleteIncome=async(req,res)=>{
  const userId=req.user._id;
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Income deleted successfully"})
  } catch (error) {
    res.status(500).json({message:"Internal server error",error:error.message})
  }
}

//EXCEL DNLD FEATURE
exports.downloadIncome=async(req,res)=>{
  const userId =req.user._id;
  try {
    const income =await Income.find({userId}).sort({date:-1});
    //prepare the data for excel
    const data=income.map((item)=>({
        
      Category:item.category,
        Amount:item.amount,
        Date:item.date 
    }))
    
    //create a new workbook
    const workbook=xlsx.utils.book_new();
    //create a new worksheet
    const worksheet=xlsx.utils.json_to_sheet(data);
    //append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook,worksheet,"Income");
    //write the workbook to a file
    xlsx.writeFile(workbook,"income_details.xlsx");
    res.download("income_details.xlsx");


  } catch (error) {
    res.status(500).json({message:"Internal server error",error:error.message})
  }
}