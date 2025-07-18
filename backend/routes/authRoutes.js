// const mongoose= require('mongoose');
const {protect} =require('../middleware/authMiddleware');
const express= require('express');
const {registerUser,loginUser,getUserInfo}=require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getuser',protect,getUserInfo);// the protect middleware is used to protect the route from unauthenticated users 

router.post("/upload-img", upload.single("image"),(req,res)=>{
    if(! req.file){
        return res.status(400).json({msg:"Please upload a file"});
    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`
    //const imageUrl = `https://example.com/uploads/image123.jpg`

    res.status(200).json({imageUrl});
})
//1/16


module.exports=router;

// upload.single("image")
// expct one file from the frontend with the field name image in the form-data.