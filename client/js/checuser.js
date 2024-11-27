function checkToken() {
 
    if (!sessionStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }
  checkToken();