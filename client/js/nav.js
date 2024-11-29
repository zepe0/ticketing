function RenderNav() {
  document.getElementById("nav-menu").innerHTML = `
         <a href="/" id='home'>🏠Home </a>
        <a href="/admin" id='admin' >🎫 Ticket </a>
        <a href="/users" id='Trabajador'> 🛠️ Trabajadores </a>
        <a href="/login" onclick=logout()> 👤  Logout  </a>   
  `;
  const path = window.location.pathname;
  const home = document.getElementById("home");
  const admin = document.getElementById("admin");
  const Trabajador = document.getElementById("Trabajador");
  if (path === "/") {
    home.classList.add("active");
  } else if (path === "/admin") {
    admin.classList.add("active");
  } else if (path === "/users") {
    Trabajador.classList.add("active");
  }
}
RenderNav();
logout = () => {
  sessionStorage.removeItem("token");
  window.location.href = "/";
};
