const express = require('express')
const app = express()
const connectDB = require('./config/mongoose')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const customMware = require('./config/middleware')
require('dotenv').config()

// Used for session cookies and passport auth
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport_local')


app.use(cookieParser())
// Set Up ejs layouts 
app.use(expressLayouts)
app.use(bodyParser.urlencoded())

// Set up view engine 
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('./assets'))

// Application Session setup 
app.use(session({
    name: 'satishCookies',
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: (1000 * 60 * 100) },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        autoRemove: 'disabled'
    })
  }))

// Using passport 
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

// Flash messages setup 
app.use(flash())
app.use(customMware.setFlash)

// User express Router 
app.use('/', require('./routes'))

// Start Application with connection to the DB.
const port = process.env.PORT || 3000
const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connected to DB');
        app.listen(port,console.log(`server started on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()