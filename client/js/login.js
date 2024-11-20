function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const user = { email, password };
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        showNotification("Error", data.error, "error");
      } else {
        if(data.sus && data.sus === true){
          setInterval(() => { window.location.href = "/tickets"; }, 3000);
   
        }
        showNotification("Success", data.message, "success");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  const user = { email, password };
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        showNotification("Error", data.error, "error");
      } else {
        showNotification("Success", data.message, "success");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showNotification(title, message, type) {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.innerHTML = `<strong>${title}</strong>: ${message}`;
  notificationContainer.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
function toggleForm() {
  const container = document.querySelectorAll(".register");
  const login = document.querySelectorAll(".login");
  const toggle = document.getElementById("toggel");

  login.forEach((element_login) => {
    {
      element_login.classList.toggle("hidden");
    }
  });

  container.forEach((element) => {
    {
      element.classList.toggle("hidden");
    }
  });
  if (login[0].classList.contains("hidden")) {
    toggle.innerHTML = ` <p id="toggel"> No tienes cuenta <a href="#" onclick="toggleForm()">registrarte</a></p>`;
  } else {
    toggle.innerHTML = `  <p id="toggel">Ya tienes cuenta <a href="#" onclick="toggleForm()">entra</a></p>`;
  }
}
