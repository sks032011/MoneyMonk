const multer=require ('multer');

const path = require('path');

// 1️ Where and how to store the file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // save file in 'uploads' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // unique name + original extension
  }
});

//file filter 
const fileFilter = (req, file, cb) =>
{
    const allowedTypes=['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); 
    }
    else{
        cb(new Error('Only .jpeg , .jpg, .png files are allowed!'), false);
    }
}

// 3️ Combine storage and filter into multer
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 }  max size 2MB
});

module.exports = upload;
