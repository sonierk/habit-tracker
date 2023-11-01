const mongoose = require('mongoose')

connectDB = (url) => {
    mongoose.connect(url)
}

module.exports = connectDB