const express = require('express');
const {protect} = require('../middleware/authMiddleware');

const {getAllExpense, addExpense, deleteExpense,downloadExpense} = require('../controllers/expenseController');
const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/download', protect, downloadExpense);

module.exports = router;