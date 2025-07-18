require("dotenv").config();
const express = require("express");
const path=require ('path');
const cors = require("cors"); // cors allows your server to accept requests from diff origis li  frontend 
const app = express();
const connectDB=require("./config/database");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashBoardRoutes");

// middleware for handling cors

app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:[ "GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        //auth=sed in secure APIs to send tokens (like JWT) for authentication.
        //all headers This tells the server which headers it should accept in requests from the client.
        // Content-Type: specify the media type of the req body 
    })
)

app.use(express.json()); //json body can be accessed in req.body 

connectDB();// connect to database

app.use("/api/v1/auth",authRoutes);// use auth routes for all requests to /api/v1/auth 
app.use("/api/v1/income",incomeRoutes)
app.use("/api/v1/expense",expenseRoutes)
app.use("/api/v1/dashboard",dashboardRoutes)
//serve upload folder-telling Express:

// whnver someone visits http://localhost:5000/uploads/somefile.jpg, go to the uploads folder in my project and send back that file.


app.use("/uploads",express.static(path.join(__dirname,"uploads")))

//When a request is made to the /uploads path, Express.js will look for files in the uploads folder and serve them as static files. For example, if you have a file named image.jpg in the uploads folder, you can access it by visiting the /uploads/image.jpg path in your browser.
//  static files:
// An image file (e.g., image.jpg) that is stored on a server and served to a client without modification.

const port=process.env.PORT || 5000
app.listen(port,()=>console.log(`server running at ${port}`))
