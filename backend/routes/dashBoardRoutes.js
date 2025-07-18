const express = require("express");
const router = express.Router();
const {protect}= require("../middleware/authMiddleware");
const {getDashboardData} = require("../controllers/dashBoardController");

router.get("/",protect,getDashboardData);

module.exports = router;