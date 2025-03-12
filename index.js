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
  const { userName, userEmail, userPassword } = req.body;

  if (!userName || !userEmail || !userPassword) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }
  //some: returns true if at least one element in the array passes the test
  const userExists = users.some((user) => user.userEmail === userEmail);
  if (userExists) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const userId = Math.floor(Math.random() * 1000000);
  const newUser = { userName, userEmail, userPassword, userId };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Login route
app.post("/login", (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  //find: returns the first element in the array that passes the test
  const user = users.find(
    (u) => u.userEmail === userEmail && u.userPassword === userPassword
  );

  if (!user) {
    return res.status(401).json({ error: "Email or password is incorrect" });
  }

  res.status(200).json(user);
});

// GET route to get posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// POST route to create a new post
app.post("/posts", (req, res) => {
  const { postImg, postTitle, postContent } = req.body;

  if (!postImg || !postTitle || !postContent) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  const newPost = { postImg, postTitle, postContent };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(5050, () => {
  console.log("Server running on http://localhost:5050");
});
