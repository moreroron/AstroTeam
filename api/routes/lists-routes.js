const express = require('express');
const router = express.Router();
const List = require('../db/models/list.model');
const Task = require('../db/models/task.model');
const Team = require('../db/models/team-model');
const moment = require('moment');

// GET /lists
// purpose: get all lists
router.get('/', (req, res) => {
    // we want to return array of all the lists in the databese
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

// GET /lists/:listId
// purpose: get a specific list
router.get('/:listId', async (req, res) => {
    const list = await List.findOne({ _id: req.params.listId });
    res.send(list);
})

// POST /lists
// purpose: create a list
router.post('/', async (req, res) => {
    // we want to creare a new list and return the new document back to the user (which includes the id) 
    // the list information (fields) will be passed in via the JSON request body
    const list = new List({
        title: req.body.title
    });
    try {
        const savedList = await list.save();
        res.json(savedList);
    } catch (err) {
        res.json({ message: err });
    }
});

// PATCH /lists/:id
// purpose: update a specified list
router.patch('/:id', (req, res) => {
    // we want to update the specified list (list document with id in the url) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
        .then(() => res.sendStatus(200));
});

// DELETE /lists/:id
// purpose: delete a specified list
router.delete('/:id', async (req, res) => {
    const deletedList = await List.findOneAndRemove({ _id: req.params.id });
    const tasks = await Task.find({ _listId: req.params.id });
    tasks.forEach(task => {
        console.log(task.team);
        Team.updateOne({ _id: task.team }, { task: null })
    })
    // const updatedTeams = await Team.updateMany({ _id: tasks.team._id }, { task: null });
    const deletedTasks = await Task.deleteMany({ _listId: req.params.id });
    res.send(deletedList);
});

// GET /lists/:listId/tasks
// purpose: get all tasks in a specific list
router.get('/:listId/tasks', (req, res) => {
    // we want to return all tasks which belongs to a specific list
    Task.find({ _listId: req.params.listId })
        .populate('author')
        .populate('team')
        .exec((err, task) => {
            if (err) return handleError(err);
            res.send(task);
        });
});

// GET /lists/:listId/tasks/taskId
// purpose: get a specific task
router.get('/:listId/tasks/:taskId', (req, res) => {
    // we want to return a task specified by taskId and listId
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId,
    })
        .populate('author')
        .populate('team')
        .exec((err, task) => {
            if (err) return handleError(err);
            res.send(task);
        });
});

// POST /lists/:listId/tasks
// purpose: create a new task in a specific list
router.post('/:listId/tasks', async (req, res) => {
    const task = new Task({
        author: req.body.author,
        title: req.body.title,
        status: req.body.status,
        _listId: req.params.listId,
        date: new Date(),
        deadline: req.body.deadline,
        team: req.body.team
    });
    const newTaskDoc = await task.save();
    // update new task for team
    const updatedTeam = await Team.findOneAndUpdate({ _id: req.body.team._id }, { task: newTaskDoc });
    res.send(newTaskDoc);
});

// PATCH /lists/:listId/tasks/:taskId
// purpose: update an existing task
router.patch('/:listId/tasks/:taskId', (req, res) => {
    // we want to update an existing task (specified by taskId)
    Task.findOneAndUpdate(
        {
            _id: req.params.taskId,
            _listId: req.params.listId
        },
        {
            $set: req.body
        }
    ).then((updatedDoc) => res.send(updatedDoc));
});

// DELETE /lists/:listId/tasks/:taskId
// purpose: delete an existing task + update user tasks
router.delete('/:listId/tasks/:taskId', async (req, res) => {
    const deletedTask = await Task.findOneAndRemove({ _id: req.params.taskId, _listId: req.params.listId });
    const updatedTeam = await Team.findOneAndUpdate({ _id: deletedTask.team._id }, { task: null });
    res.send(deletedTask);
});

module.exports = router;