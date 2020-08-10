const express = require('express');
const router = express.Router();
const Task = require('../db/models/task.model');

router.get('/', (req, res) => {
    Task.find({})
        .then(tasks => res.send(tasks));
});

module.exports = router;