const keys = require('../keys');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodb.connection_string, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to mongoDB succesfully!");
}).catch(e => {
    console.log("error while attempting to connect to mongoDB");
    console.log(e);
});

// index.js file stores all mongoose schemas
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = { mongoose };