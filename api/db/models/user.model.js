const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleId: String,
    country: {
        type: String,
        default: "israel"
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
})

module.exports = mongoose.model('User', UserSchema)
