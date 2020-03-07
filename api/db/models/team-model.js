const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
})

module.exports = mongoose.model('Team', TeamSchema)