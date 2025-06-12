const express = require('express');
require('./db.js'); // Connects to DB

const Person = require('./models/person.js');
const BooksCategory = require('./models/BooksCategory.js');
// const Hotel = require('./models/hotel.model.js'); // add this import if needed

const app = express();
app.use(express.json()); // Important

// getBooksCategory and SubCategory Data
app.get('/api/books', async (req, res) => {
  try {
    const categories = await BooksCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching data',
      error: err.message
    });
  }
});


// ✅ POST route
app.post('/api/person', async (req, res) => {
  console.log('✅ API hit');
  try {
   const newPerson = new Person(req.body);
   const savedPerson = await newPerson.save();
   
   res.status(200).json(
      {
      success : true,
      message:"User Created Successfully.",
      data:savedPerson

      }
    );

  } catch (error) {

    console.error('❌ Error saving person:', error);

      if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists.'
      });
    }


     res.status(500).json({
      success: false,
      message: 'Failed to Create User',
      error: error.message || 'Internal Server Error',
    });
  }
});




// GET /api/getPersons - Get all person data
// GET /api/getPersons?role=chef
app.get('/api/getPersons', async (req, res) => {
  try {
    const { role } = req.query;

    var filter = {};
    if (role) {
      filter.role = role;
      
    }

   const persons = await Person.find(filter);

    res.status(200).json({
      message: persons.length > 0 ? "Data Fetch Successfully" : "No Data Found",
      data: persons
    });
  } catch (err) {
    console.error('❌ Error fetching persons:', err);
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
});



//Delete Person by Id

app.delete('/api/DeletePerson/:id', async (req, res) => {
  const { id } = req.params;

  try {
    //const deletedPerson = await Person.findByIdAndDelete(id);
    const deletedPerson = await Person.findByIdAndDelete(id);

    if (!deletedPerson) {
      return res.status(404).json({
        success: false,
        message: 'Person not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Person deleted successfully',
      data: deletedPerson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete person',
      error: error.message,
    });
  }
});

//Update Data Api 

app.put('/api/UpdatePerson/:id', async (req, res) => {
  
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, updateData, {
      new: true,       // Return the updated document
      runValidators: true, // Enforce schema validation
    });

    if (!updatedPerson) {
      return res.status(404).json({
        success: false,
        message: 'Person not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Person updated successfully',
      data: updatedPerson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update person',
      error: error.message,
    });
  }
});

//Delete ALL Persion Data 

app.delete('/api/DeleteAllPersons', async (req, res) => {
  try {
    const result = await Person.deleteMany({}); // Deletes all documents

    res.status(200).json({
      success: true,
      message: result.deletedCount==0?'No Persion Found':'All persons deleted successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete persons',
      error: error.message,
    });
  }
});






// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
