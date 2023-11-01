const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


// Authentication using passport LocalStrategy 
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function(email, password, done){
        let user = await User.findOne({email: email})
        if(!user || user.password != password){
            console.log('Invalid username/password');
            return done(null, false)
        }
        return done(null, user)
    }
))

// Serialing the user to decide which key to store in the cookies 
passport.serializeUser(function(user,done){
    done(null, user.id)
})

// Deserialise the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    let userId = await User.findById(id)
    if(!userId){
        console.log('Error in passport-local/Deserialize');
        return
    }
    return done(null, userId)
})

// Check Authentiation 
passport.checkAuthentication = (req, res, next) => {
    // If user is logged in pass it to next 
    if(req.isAuthenticated()){
        return next()
    }
    // If user not logged in 
    return res.redirect('/users/sign-in')
}

// Setting up Authentication 
passport.setAuthenticatedUser = (req, res, next)=> {
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport