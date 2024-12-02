window.onload = generateCaptcha;

let currentCaptcha = "";

function generateCaptcha() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  currentCaptcha = captcha;
  document.getElementById("captcha").textContent = captcha;
}

