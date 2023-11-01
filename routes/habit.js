const express = require('express')
const router = express.Router()
const habitController = require('../controllers/habit_controller')

// Create new habit route 
router.post('/create-habit', habitController.createHabit)

// Change status of habit 
router.get('/toggle-status',habitController.toggleStatus)

// Delete a habit 
router.get('/delete-habit',habitController.deleteHabit)

// Update a habit 
router.post('/edit-habit', habitController.editHabit)


module.exports = router