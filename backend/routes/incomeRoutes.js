const express = require('express');
const {protect} = require('../middleware/authMiddleware');

const {getAllIncome, addIncome, deleteIncome,downloadIncome} = require('../controllers/incomeController');
const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncome);
router.delete('/:id', protect, deleteIncome);
router.get('/download', protect, downloadIncome);

module.exports = router;