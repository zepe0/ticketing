function RenderNav() {
  document.getElementById("nav-menu").innerHTML = `
         <a href="/" id='home'>🏠Home </a>
        <a href="/admin" id='admin' > 🎫 Ticket </a>
        <a href="/users" id='Trabajador'> 🛠️ Trabajadores </a>
        <a href="/trabajadores" id='mistickets'> Mis 🎫 </a>
         <a href="/userticket" id='misticketsUser'> Mis 🎫 User</a>
        <a href="/login" onclick=logout()> 👤  Logout  </a>   
  `;
  const path = window.location.pathname;
  const home = document.getElementById("home");
  const admin = document.getElementById("admin");
  const Trabajador = document.getElementById("Trabajador");
  const mistickets = document.getElementById("mistickets");
  const misticketsUser = document.getElementById("misticketsUser");
  debugger;
  if (path === "/") {
    home.classList.add("active");
  } else if (path === "/admin") {
    admin.classList.add("active");
  } else if (path === "/users") {
    Trabajador.classList.add("active");
  }
  if (path === "/trabajadores") {
    mistickets.classList.add("active");
  }
  if (path === "/userticket") {
    misticketsUser.classList.add("active");
  }

  const rol = JSON.parse(
    atob(sessionStorage.getItem("token").split(".")[1])
  ).rol;

  if (rol === 0) {
    mistickets.style.display = "none";
    misticketsUser.style.display = "none";
  }
  if (rol === 1) {
    Trabajador.style.display = "none";
    admin.style.display = "none";
    mistickets.style.display = "none";
  }
  if (rol === 2) {
    admin.style.display = "none";
    Trabajador.style.display = "none";
    misticketsUser.style.display = "none";
  }
}
RenderNav();
logout = () => {
  sessionStorage.removeItem("token");
  window.location.href = "/";
};
