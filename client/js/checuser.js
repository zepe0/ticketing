function checkToken() {
  const token = sessionStorage.getItem("token");
  const alreadyRedirected = localStorage.getItem("alreadyRedirected");

  /*  if (token && !alreadyRedirected) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.rol === 0) {
      localStorage.setItem("alreadyRedirected", "true");
      window.location.href = "/admin";
    } else if ( payload.rol === 1) {
      localStorage.setItem("alreadyRedirected", "true");
      window.location.href = "/users";
    } else {
      localStorage.setItem("alreadyRedirected", "true");
      window.location.href = "/login";
    }
  } else */ if (!token && window.location.pathname !== "/login") {
    localStorage.setItem("alreadyRedirected", "true");
    window.location.href = "/login";
  } else {
    localStorage.removeItem("alreadyRedirected");
  }
}

checkToken();
