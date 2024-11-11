import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

io.on("connection", (socket) => {
  console.log("Usuario Conectado");

  socket.on("disconnect", () => {
    console.log("Usuario Desconectado");
  });

  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(process.cwd() + "/client/admin.html");
});
app.get("/tickets", (req, res) => {
  res.sendFile(process.cwd() + "/client/tickets.html");
});

app.get("/users", (req, res) => {
  res.sendFile(process.cwd() + "/client/usuarios.html");
});
app.get("/newticket", (req, res) => {
  res.sendFile(process.cwd() + "/client/formclient.html");
});
