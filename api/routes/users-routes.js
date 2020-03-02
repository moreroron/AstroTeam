const express = require('express');
const router = express.Router();
const passportSetup = require('../auth/passport-setup');
const { mongoose } = require('../db/mongoose');
const User = require('../db/models/user.model');

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then(user => res.send(user));
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