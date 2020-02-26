// const router = require('express').Router();
// const CLIENT_HOME_PAGE_URL = "http://localhost:3000/dashboard";
// const { List, Task, User } = require('../db/models');

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

// module.exports = router;