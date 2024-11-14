function getOS() {
  var userAgent = window.navigator.userAgent;
  var os = null;
  if (/android/i.test(userAgent)) {
    os = "Android";
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    os = "iOS";
  } else if (/Mac/.test(userAgent)) {
    os = "Mac OS";
  } else if (/Win/.test(userAgent)) {
    os = "Windows";
  } else if (/Linux/.test(userAgent)) {
    os = "Linux";
  }

  return os;
}
function redirectToApp() {
  var os = getOS();
  if (os === "iOS") {
    window.location.href = "itms-apps://apps.apple.com/es/app/cityvitae";
  } else if (os === "Android") {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.app.cityvitae&hl=es_419&pli=1";
  } else {
    const osin = document.getElementById("os");
    osin.innerText =
      "No disponemos actualmente de una aplicación para tu sistema operativo de " +
      os +
      ".";
  }
}
redirectToApp();
