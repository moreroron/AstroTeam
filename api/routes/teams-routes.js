const express = require('express');
const router = express.Router();
const Team = require('../db/models/team-model');

router.get('/', (req, res) => {
    Team.find({})
        .then(teams => res.send(teams));
});

router.post('/', async (req, res) => {
    const team = new Team({
        title: req.body.title,
        users: req.body.users
    });
    const savedTeam = await team.save();
    res.send(savedTeam);
});

router.delete('/:teamId', (req, res) => {
    Team.findOneAndRemove({ _id: req.params.teamId })
        .then(deletedTeam => res.send(deletedTeam));
});

module.exports = router;