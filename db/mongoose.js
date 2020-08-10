// this file will handle connection logic to the mongoDB database 

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TaskManager', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to mongoDB succesfully!");
}).catch(e => {
    console.log("error while attempting to connect to mongoDB");
    console.log(e);
});

// ** Use index.js file to store all mongoose schemas **
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = { mongoose };