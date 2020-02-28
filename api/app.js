const express = require('express');
const app = express();
const cors = require('cors')
const authRoutes = require('./routes/auth-routes');
// const userRoutes = require('./routes/user-routes');
// const listsRoutes = require('./routes/lists-routes');
const passportSetup = require('./auth/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./keys');
const passport = require('passport');
const geocode = require('./utils/geocode');
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');

// socket.io related
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

// load in the mongoose models
const { List, Task, User } = require('./db/models');

// ********************************
// MIDDLEWARE
// ********************************

app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);
app.use(cookieSession({
    name: "user-session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
// alter the req object and change the encrypted user value that is currently the session sig 
//(from the client cookie) into a user object.
app.use(passport.session());
app.use('/auth', authRoutes);
// app.use('/users', userRoutes);
app.use(bodyParser.json());

// ********************************
// ROUTES
// ********************************

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", (req, res) => {
    if (!req.user) {
        res.json({
            authenticated: false,
            message: "user has not been authenticated"
        })
    } else {
        res.json({
            authenticated: true,
            message: "user successfully authenticated",
            user: req.user,
            cookies: req.cookies
        })
    }
});

app.get('/geocode/:address', (req, res) => {

    const address = req.params.address;

    geocode(address, (err, { longitude, lantitude, location } = {}) => {
        if (!address) {
            return res.send({ error: 'No such address has been found' })
        }
        if (err) {
            return res.send({ error: err })
        }
        res.send({ longitude, lantitude, location });
    })
});

app.get('/users/:userId', (req, res) => {
    User.find({ _id: req.params.userId })
        .then(user => res.send(user));
});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    })
});

app.patch('/users/:userId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
        .then(() => res.sendStatus(200));
});

// GET /lists
// purpose: get all lists
app.get('/lists', (req, res) => {
    // we want to return array of all the lists in the databese
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

// GET /lists/:listId
// purpose: get a specific list
app.get('/lists/:listId', (req, res) => {
    List.find({ _id: req.params.listId })
        .then(list => res.send(list));
})

// POST /lists
// purpose: create a list
app.post('/lists', (req, res) => {
    // we want to creare a new list and return the new document back to the user (which includes the id) 
    // the list information (fields) will be passed in via the JSON request body
    let title = req.body.title;
    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (id included)
        res.send(listDoc);
    });
});

// PATCH /lists/:id
// purpose: update a specified list
app.patch('/lists/:id', (req, res) => {
    // we want to update the specified list (list document with id in the url) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
        .then(() => res.sendStatus(200));
});

// DELETE /lists/:id
// purpose: delete a specified list
app.delete('/lists/:id', (req, res) => {
    // we want to delete the specified list
    List.findOneAndRemove({ _id: req.params.id }).then(removedListDoc => {
        Task.remove({ _listId: req.params.id })
            .then(res.send(removedListDoc));
    });
});

// GET /lists/:listId/tasks
// purpose: get all tasks in a specific list
app.get('/lists/:listId/tasks', (req, res) => {
    // we want to return all tasks which belongs to a specific list
    Task.find({ _listId: req.params.listId })
        .then(tasks => res.send(tasks));
});

// GET /lists/:listId/tasks/taskId
// purpose: get a specific task
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    // we want to return a task specified by taskId and listId
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId,
    }).then(task => res.send(task));

    console.log(res);
});

// POST /lists/:listId/tasks
// purpose: create a new task in a specific list
app.post('/lists/:listId/tasks', (req, res) => {
    // we want to create a new task in a list specified by listId
    let newTask = new Task({
        title: req.body.title,
        status: req.body.status,
        authorId: req.body.authorId,
        _listId: req.params.listId,
        date: new Date(),
    });
    newTask.save().then(newTaskDoc => {
        res.send(newTaskDoc);
    });
});

// PATCH /lists/:listId/tasks/:taskId
// purpose: update an existing task
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // we want to update an existing task (specified by taskId)
    Task.findOneAndUpdate(
        {
            _id: req.params.taskId,
            _listId: req.params.listId
        },
        {
            $set: req.body
        }
    ).then(() => res.sendStatus(200));
});

// DELETE /lists/:listId/tasks/:taskId
// purpose: delete an existing task
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then(removedTaskDoc => res.send(removedTaskDoc));
});


const server = app.listen(3001, () => {
    console.log("server is listening on port 3001");
});

// ********************************
// SOCKET.IO
// ********************************

const io = socketIo(server);
io.on('connection', socket => {
    console.log('made socket connection', socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
});