const User = require('../models/user');


// Redirects to user sign up page 
module.exports.signUp = async (req,res) => {
    try {
        return res.render('user_sign_up', {
            title: "Sign Up"
        })
    } catch (error) {
        console.log('Error in userController/SignUp', error);
        return res.redirect('back')
    }
}

// Redirects to user sign in page 
module.exports.signIn = async (req, res)=> {
    try {
        return res.render('user_sign_in',{
            title: "Sign In"
        })
    } catch (error) {
        console.log('Error in userController/SignIp', error);
        return res.redirect('back')
    }
}

// Create a new user 
module.exports.create = async (req, res)=> {
    try {
        console.log(req.body); 
        if(req.body.password != req.body.confirm_password){
            console.log('Password Mismatch');
            return res.redirect('back')  
        }
        let user = await User.findOne({email: req.body.email})
        // If user not exist 
        if(!user){
            await User.create(req.body)
            return res.redirect('/users/sign-in')
        }
        console.log('User already exist!');
        return res.redirect('/users/sign-in')
               
    } catch (error) {
        console.log('Error creating the user', error);
        return res.redirect('back')
    }
}

// Sign in existing user
module.exports.createSession = async(req,res) => {
    // console.log(req.cookies);
    // res.cookie('id', 11111)
    req.flash('success',"Logged In Successfully!!")
    return res.redirect('/')
}

// Signs out user 
module.exports.destroySession = async (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return done(err)
        }
    })
    return res.redirect('/users/sign-in')
}

// Redirects user to forgot password page 
module.exports.forgetPassword = async (req, res)=> {
    try {
        return res.render('forget_password', {
            title: 'Reset Password'
        })
    } catch (error) {
        console.log('Error in usersController/forgetPassword');
        return res.redirect('back')
    }
}
// Reset password 
module.exports.resetPassword = async (req, res)=> {
    try {
        let user = await User.findOne({email: req.body.email})
        if(!user){
            return res.redirect('/users/sign-up')
        }
        if(req.body.password == req.body.confirm_password){
            user.password = req.body.password
            await user.updateOne({password: req.body.password})
            return res.redirect('/users/sign-in')
        }
    } catch (error) {
        console.log('Error in userController/resetPassword', error);
        return
    }
}