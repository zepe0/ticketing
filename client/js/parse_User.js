function ParseToken() {
  const token = sessionStorage.getItem("token");

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.rol;
}
checkToken();
