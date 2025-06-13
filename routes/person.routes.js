const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// POST /api/person
router.post('/person', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.status(200).json({ success: true, message: "User Created Successfully.", data: savedPerson });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ success: false, message: 'Email already exists.' });
    }
    res.status(500).json({ success: false, message: 'Failed to Create User', error: error.message });
  }
});

// GET /api/getPersons
router.get('/getPersons', async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const persons = await Person.find(filter);
    res.status(200).json({ message: persons.length ? "Data Fetch Successfully" : "No Data Found", data: persons });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
});

// PUT /api/UpdatePerson/:id
router.put('/UpdatePerson/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPerson) {
      return res.status(404).json({ success: false, message: 'Person not found' });
    }
    res.status(200).json({ success: true, message: 'Person updated successfully', data: updatedPerson });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update person', error: error.message });
  }
});

// DELETE /api/DeletePerson/:id
router.delete('/DeletePerson/:id', async (req, res) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Person not found' });
    }
    res.status(200).json({ success: true, message: 'Person deleted successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete person', error: error.message });
  }
});

// DELETE /api/DeleteAllPersons
router.delete('/DeleteAllPersons', async (req, res) => {
  try {
    const result = await Person.deleteMany({});
    res.status(200).json({
      success: true,
      message: result.deletedCount === 0 ? 'No Person Found' : 'All persons deleted successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete persons', error: error.message });
  }
});

module.exports = router;
