const mongoose = require('mongoose');

// Subcategory Schema
const SubcategorySchema = new mongoose.Schema({
  id: Number,
  name: String
}, { _id: false }); // Avoid creating _id for subdocuments

// BooksCategory Schema
const BooksCategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  subcategories: [SubcategorySchema]
}, {
  collection: 'bookscategories' // 👈 Ensure it uses the correct MongoDB collection
});

// Export the model
module.exports = mongoose.model('bookscategories', BooksCategorySchema);
