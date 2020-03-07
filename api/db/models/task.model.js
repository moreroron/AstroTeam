const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    status: String, // Bug, Open, Closed
    date: Date,
    deadline: {
        type: Date,
        required: true
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
})

module.exports = mongoose.model('Task', TaskSchema)