const express = require('express');
const router = express.Router();
const passportSetup = require('../auth/passport-setup');
const { mongoose } = require('../db/mongoose');
const User = require('../db/models/user.model');
const Task = require('../db/models/task.model');

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .populate('tasks')
        .exec((err, user) => {
            if (err) res.send(err);
            res.send(user);
        });
});

router.get('/:userId/tasks', (req, res) => {
    Task.find({ author: req.params.userId })
        .then(tasks => res.send(tasks));
});

router.get('/', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    })
});

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

module.exports = router;