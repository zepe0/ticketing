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
  const osin = document.getElementById("os");
  let secondsLeft = 5;

  if (os === "iOS" || os === "Mac OS") {
    const interval = setInterval(() => {
      if (secondsLeft <= 0) {
        clearInterval(interval);
        window.location.href = "itms-apps://apps.apple.com/es/app/cityvitae";
      }
    }, 1000);
  } else if (os === "Android") {
    const interval = setInterval(() => {
      secondsLeft--;

      if (secondsLeft <= 0) {
        clearInterval(interval);

        window.location.href =
          "https://play.google.com/store/apps/details?id=com.app.cityvitae&hl=es_419&pli=1";
      }
    }, 1000);
  } else {
    window.location.href = "https://cityvitae.com";
  }
}
redirectToApp();
