document.getElementById("get-btn").addEventListener("click", getUsers);

function getUsers() {
  fetch("http://localhost:5050/users")
    .then((response) => response.json())
    .then((data) => console.log("get response", data))
    .catch((error) => console.error("Error:", error));
}

//Nav to Register Form
const showRegisterForm = () => {
  const registerForm = document.getElementById("register-container");
  registerForm.style.display = "block";

  const registerRedirect = document.getElementById("register-redirection");
  registerRedirect.style.display = "none";

  const loginRedirect = document.getElementById("login-redirection");
  loginRedirect.style.display = "none";
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
};

document
  .getElementById("login-redirection")
  .addEventListener("click", showLoginForm);

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

  const response = await fetch("http://localhost:5050/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const data = await response.json();
  console.log("register response", data);
};
document.getElementById("register-btn").addEventListener("click", registerUser);
