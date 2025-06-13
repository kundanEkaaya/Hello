const express = require('express');
require('./db'); // DB connection
const app = express();

app.use(express.json());

// Routes
app.use('/api', require('./routes/books.routes'));   // /api/books
app.use('/api', require('./routes/person.routes'));  // all person routes with custom paths

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
