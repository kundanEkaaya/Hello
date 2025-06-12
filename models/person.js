const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const personSchema = new mongoose.Schema({
  personId: Number, // auto-increment field
  name:{
    type:String,
    required:true
  },
  age: Number,
  age:{
    type:String,
    required:true,
  },
  email: String,
  address: String,
  role: {
    type: String,
    enum: ['chef', 'Manager', 'Waiter'],
    required: true
  }
});

personSchema.plugin(AutoIncrement, { inc_field: 'personId' });


const Person = mongoose.model('Person', personSchema);

module.exports = Person;
