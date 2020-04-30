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
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
