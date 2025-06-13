require('dotenv').config();

const express = require('express');
require('./db'); // DB connection
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


// Routes
app.use('/api', require('./routes/books.routes'));   // /api/books
app.use('/api', require('./routes/person.routes'));  // all person routes with custom paths

app.listen(PORT, () => {
  console.log('🚀 Server running on http://localhost:3000');
});

//comment for checking


