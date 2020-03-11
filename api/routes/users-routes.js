const express = require('express');
const router = express.Router();
const passportSetup = require('../auth/passport-setup');
const { mongoose } = require('../db/mongoose');
const User = require('../db/models/user.model');
const Task = require('../db/models/task.model');

// get all users
router.get('/', (req, res) => {
    User.find({})
        .populate('tasks')
        .exec((err, users) => {
            if (err) res.send(err);
            res.send(users)
        })
});

// get a specific user
router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .populate('tasks')
        .exec((err, user) => {
            if (err) res.send(err);
            res.send(user);
        });
});

// patch a specific user
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: req.body }
        );
        res.send(updatedUser);
    } catch (err) {
        res.send({ message: err })
    }
});

// get all tasks of a specific user
router.get('/:userId/tasks', (req, res) => {
    Task.find({ author: req.params.userId })
        .then(tasks => res.send(tasks));
});

module.exports = router;