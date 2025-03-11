document
  .getElementById("get-btn")
  .addEventListener("click", getUsers, getPosts);

function getUsers() {
  fetch("http://localhost:5050/users")
    .then((response) => response.json())
    .then((data) => console.log("get response", data))
    .catch((error) => console.error("Error:", error));
}

function getPosts() {
  fetch("http://localhost:5050/posts")
    .then((response) => response.json())
    .then((data) => console.log("get response", data))
    .catch((error) => console.error("Error:", error));
}

//Nav to register/login form
const showRegisterLoginForm = () => {
  const registerLoginForm = document.getElementById(
    "register-login-redirection-container"
  );
  registerLoginForm.style.display = "block";

  const registerRedirect = document.getElementById("register-redirection");
  registerRedirect.style.display = "block";

  const loginRedirect = document.getElementById("login-redirection");
  loginRedirect.style.display = "block";

  const registerContainer = document.getElementById("register-container");
  registerContainer.style.display = "none";

  const loginContainer = document.getElementById("login-container");
  loginContainer.style.display = "none";

  const goBackBtn = document.querySelector(".back-btn-register-login");
  goBackBtn.style.display = "none";
};

//Nav to Register Form
const showRegisterForm = () => {
  const registerForm = document.getElementById("register-container");
  registerForm.style.display = "block";

  const registerRedirect = document.getElementById("register-redirection");
  registerRedirect.style.display = "none";

  const loginRedirect = document.getElementById("login-redirection");
  loginRedirect.style.display = "none";

  const goBackBtn = document.querySelector(".back-btn-register-login");
  goBackBtn.style.display = "block";
};
document
  .getElementById("register-redirection")
  .addEventListener("click", showRegisterForm);

// Nav to Login Form
const showLoginForm = () => {
  const loginForm = document.getElementById("login-container");
  loginForm.style.display = "block";

  const registerRedirect = document.getElementById("register-redirection");
  registerRedirect.style.display = "none";

  const loginRedirect = document.getElementById("login-redirection");
  loginRedirect.style.display = "none";

  const goBackBtn = document.querySelector(".back-btn-register-login");
  goBackBtn.style.display = "block";
};
document
  .getElementById("login-redirection")
  .addEventListener("click", showLoginForm);

// Nav to create Post Form
const showCreatePostForm = () => {
  const createPostForm = document.getElementById("create-post-container");
  createPostForm.style.display = "block";

  const loginForm = document.getElementById("login-container");
  loginForm.style.display = "none";
};

// Go Back Button
document
  .querySelector(".back-btn-register-login")
  .addEventListener("click", showRegisterLoginForm);

// Register User
const registerUser = async (event) => {
  event.preventDefault();

  const userName = document.getElementById("register-username").value;
  const userEmail = document.getElementById("register-email").value;
  const userPassword = document.getElementById("register-password").value;
  const userId = Math.floor(Math.random() * 1000000);

  const userInfo = {
    userName: userName,
    userEmail: userEmail,
    userPassword: userPassword,
    userId: userId,
  };

  // Post user to database
  const response = await fetch("http://localhost:5050/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  }); // Send user info to server
  const data = await response.json();
  console.log("register response", data);

  showRegisterLoginForm();
};
document.getElementById("register-btn").addEventListener("click", registerUser);

// Login User
const loginUser = async (event) => {
  event.preventDefault();

  const userEmail = document.getElementById("login-email").value;
  const userPassword = document.getElementById("login-password").value;

  // Get all users
  const response = await fetch("http://localhost:5050/users");
  const data = await response.json();

  // Find user and compare input to database
  const user = data.find(
    (user) => user.userEmail === userEmail && user.userPassword === userPassword
  );

  if (user) {
    console.log("login response", user);
  } else {
    console.log("login response", "User not found");
  }

  showCreatePostForm();
};
document.getElementById("login-btn").addEventListener("click", loginUser);

// Create Post
const createPost = async (event) => {
  event.preventDefault();

  const postImg = document.getElementById("post-url").value;
  const postTitle = document.getElementById("post-title").value;
  const postContent = document.getElementById("post-description").value;
  // const userId = userInfo.userId;

  const postInfo = {
    postImg: postImg,
    postTitle: postTitle,
    postContent: postContent,
    // userId: userId,
  };

  const response = await fetch("http://localhost:5050/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postInfo),
  });
  const data = await response.json();
  console.log("post response", data);
};
document
  .getElementById("create-post-btn")
  .addEventListener("click", createPost);
