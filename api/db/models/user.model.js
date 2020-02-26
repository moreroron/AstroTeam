const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleId: String
    // tasks: []
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }