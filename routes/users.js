const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')
const passport = require('passport')

router.get('/sign-up', usersController.signUp)
router.get('/sign-in', usersController.signIn)

router.post('/create', usersController.create)

// Use passport-local for auth 
router.post('/create-session',passport.authenticate('local',{failureRedirect: '/users/sign-in'}),usersController.createSession)

// Destroy user session(sign-out)
router.get('/sign-out', usersController.destroySession)

// Takes to forget passport page 
router.get('/forget-password', usersController.forgetPassword)

// Change Password 
router.post('/reset-password',usersController.resetPassword)

// Route to habit endpoint 
router.use('/habit', require('./habit'));


module.exports = router