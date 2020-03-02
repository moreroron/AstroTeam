const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
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
    authorId: String
})

module.exports = mongoose.model('Task', TaskSchema)