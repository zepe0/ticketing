import { io } from "https://cdn.socket.io./4.3.2/socket.io.esm.min.js";

const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const msn = document.getElementById("msn");


socket.on("login", (msg) => {
  const item = `<li>${msg}</li>`;
  msn.insertAdjacentHTML("beforeend", item);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    let user = { name: input.value };

    socket.emit("login", user);
    input.value = "";
  }
});
