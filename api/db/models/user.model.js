const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleId: String,
    country: {
        type: String,
        default: "israel"
    },
    tasks: []
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }