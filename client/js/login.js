function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  // Aquí puedes agregar la lógica para el proceso de login
  console.log("Login:", { email, password });
}

function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  // Aquí puedes agregar la lógica para el proceso de registro

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
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
