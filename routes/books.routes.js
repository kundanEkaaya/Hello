const express = require('express');
const router = express.Router();
const BooksCategory = require('../models/BooksCategory');

// GET /api/books
router.get('/books', async (req, res) => {
  try {
    const categories = await BooksCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching data', error: err.message });
  }
});

module.exports = router;
