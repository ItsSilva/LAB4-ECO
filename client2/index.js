// GET user from database
function getUsers() {
  fetch("http://localhost:5050/users")
    .then((response) => response.json())
    .then((data) => {
      console.log("get response user data", data);

      const container = document.getElementById("users-generate-container");

      container.innerHTML = "";

      data.forEach((e) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h2>${e.userName}</h2>
            <p>${e.userEmail}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error:", error));
}
document
  .getElementById("users-generate-button")
  .addEventListener("click", getUsers);

// GET post from database
const getPosts = () => {
  fetch("http://localhost:5050/posts")
    .then((response) => response.json())
    .then((data) => {
      console.log("get response post data", data);

      const container = document.getElementById("posts-generate-container");

      container.innerHTML = "";

      data.forEach((e) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${e.postImg}" alt="${e.postTitle}">
            <h2>${e.postTitle}</h2>
            <p>${e.postContent}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error:", error));
};

document
  .getElementById("posts-generate-button")
  .addEventListener("click", getPosts);
