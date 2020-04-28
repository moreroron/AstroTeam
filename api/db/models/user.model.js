const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  avatar: String,
  googleId: String,
  closedTasksCounter: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
    default: "israel",
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
