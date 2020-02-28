// const router = require('express').Router();
// const { List, Task, User } = require('../db/models');


// // GET /lists
// // purpose: get all lists
// router.get('/', (req, res) => {
//     // we want to return array of all the lists in the databese
//     List.find({}).then((lists) => {
//         res.send(lists);
//     })
// })

// // GET /lists/:listId
// // purpose: get a specific list
// router.get('/:listId', (req, res) => {
//     List.find({ _id: req.params.listId })
//         .then(list => res.send(list));
// })

// // POST /lists
// // purpose: create a list
// router.post('/', (req, res) => {
//     // we want to creare a new list and return the new document back to the user (which includes the id) 
//     // the list information (fields) will be passed in via the JSON request body
//     let title = req.body.title;
//     let newList = new List({
//         title
//     });
//     newList.save().then((listDoc) => {
//         // the full list document is returned (id included)
//         res.send(listDoc);
//     });
// });

// // PATCH /lists/:id
// // purpose: update a specified list
// router.patch('/:id', (req, res) => {
//     // we want to update the specified list (list document with id in the url) with the new values specified in the JSON body of the request
//     List.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
//         .then(() => res.sendStatus(200));
// });

// // DELETE /lists/:id
// // purpose: delete a specified list
// router.delete('/:id', (req, res) => {
//     // we want to delete the specified list
//     List.findOneAndRemove({ _id: req.params.id }).then(removedListDoc => {
//         Task.remove({ _listId: req.params.id })
//             .then(res.send(removedListDoc));
//     });
// });

// // GET /lists/:listId/tasks
// // purpose: get all tasks in a specific list
// router.get('/:listId/tasks', (req, res) => {
//     // we want to return all tasks which belongs to a specific list
//     Task.find({ _listId: req.params.listId })
//         .then(tasks => res.send(tasks));
// });

// // GET /lists/:listId/tasks/taskId
// // purpose: get a specific task
// router.get('/:listId/tasks/:taskId', (req, res) => {
//     // we want to return a task specified by taskId and listId
//     Task.findOne({
//         _id: req.params.taskId,
//         _listId: req.params.listId,
//     }).then(task => res.send(task));

//     console.log(res);
// });

// // POST /lists/:listId/tasks
// // purpose: create a new task in a specific list
// router.post('/:listId/tasks', (req, res) => {
//     // we want to create a new task in a list specified by listId
//     let newTask = new Task({
//         title: req.body.title,
//         status: req.body.status,
//         authorId: req.body.authorId,
//         _listId: req.params.listId,
//         date: new Date(),
//     });
//     newTask.save().then(newTaskDoc => {
//         res.send(newTaskDoc);
//     });
// });

// // PATCH /lists/:listId/tasks/:taskId
// // purpose: update an existing task
// router.patch('/:listId/tasks/:taskId', (req, res) => {
//     // we want to update an existing task (specified by taskId)
//     Task.findOneAndUpdate(
//         {
//             _id: req.params.taskId,
//             _listId: req.params.listId
//         },
//         {
//             $set: req.body
//         }
//     ).then(() => res.sendStatus(200));
// });

// // DELETE /lists/:listId/tasks/:taskId
// // purpose: delete an existing task
// router.delete('/:listId/tasks/:taskId', (req, res) => {
//     Task.findOneAndRemove({
//         _id: req.params.taskId,
//         _listId: req.params.listId
//     }).then(removedTaskDoc => res.send(removedTaskDoc));
// });

// module.exports = router;