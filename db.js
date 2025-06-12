const mongoose = require('mongoose');

const mongooseURL = 'mongodb://localhost:27017/OldBooksAdda';

mongoose.connect(mongooseURL);

const db = mongoose.connection;

db.on('connected', () => console.log('✅ Mongoose connected'));
db.on('error', (err) => console.error('❌ Mongoose error:', err));
db.once('open', () => console.log('🚀 Mongoose connection open'));

module.exports = db;
