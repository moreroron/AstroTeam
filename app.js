const express = require("express");
const port = process.env.PORT || 3001;
const path = require('path');
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/users-routes");
const listsRoutes = require("./routes/lists-routes");
const tasksRoutes = require("./routes/tasks-routes");
const teamRoutes = require("./routes/teams-routes");
const utilsRoutes = require("./routes/utils-routes");

const passportSetup = require("./auth/passport-setup");
const cookieSession = require("cookie-session");
const keys = require("./keys");
const passport = require("passport");
const geocode = require("./utils/geocode");
const { mongoose } = require("./db/mongoose");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");

// ********************************
// MIDDLEWARE
// ********************************

app.use(
  cors({
    origin: "http://localhost:3000", // allows the server to accept requests from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);
app.use(
  cookieSession({
    name: "user-session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);
app.use(passport.initialize());
// alter the req object and change the encrypted user value that is currently the session sig
//(from the client cookie) into a user object.
app.use(passport.session());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/lists", listsRoutes);
app.use("/tasks", tasksRoutes);
app.use("/teams", teamRoutes);
app.use("/utils", utilsRoutes);

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
    });
  } else {
    res.json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

app.get("/geocode/:address", (req, res) => {
  const address = req.params.address;

  geocode(address, (err, { longitude, lantitude, location } = {}) => {
    if (!address) {
      return res.send({ error: "No such address has been found" });
    }
    if (err) {
      return res.send({ error: err });
    }
    res.send({ longitude, lantitude, location });
  });
});

// for production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const server = app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

// ********************************
// SOCKET.IO
// ********************************

const io = socketIo(server);
io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
