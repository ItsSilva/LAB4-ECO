const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/client1", express.static(path.join(__dirname, "client1")));
app.use("/client2", express.static(path.join(__dirname, "client2")));

let users = [];
let posts = [];

// GET route to get users
app.get("/users", (req, res) => {
  res.send(users);
});

// POST route to create a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET route to create a new post
app.get("/posts", (req, res) => {
  res.send(posts);
});

// POST route to create a new post
app.post("/posts", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});
app.listen(5050);
