// const router = require('express').Router();
// const { List, Task, User } = require('../db/models');

// router.get('/:userId', (req, res) => {
//     User.find({ _id: req.params.userId })
//         .then(user => res.send(user));
// });

// router.get('/', (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users);
//     })
// });

// router.patch('/:userId', (req, res) => {
//     User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
//         .then(() => res.sendStatus(200));
// });

// module.exports = router;