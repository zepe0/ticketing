import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { createClient } from "@libsql/client";
/*
Activar solo en modo dev

process.loadEnvFile('.env');

*/

// Renombrados //
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const db = createClient({
  url: "libsql://firm-katana-zepe0.turso.io",
  authToken: process.env.DB_TOKEN,
});

//   TABLAS SQL //
await db.execute(`
  CREATE TABLE IF NOT EXISTS msn (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  )
`);

// Conexión

/// CHAT

io.on("connection", async (socket) => {
  console.log("Usuario Conectado");

  socket.on("disconnect", () => {
    console.log("Usuario Desconectado");
  });

  // mensajes //
  socket.on("chat", async (msg) => {
    let result;
    try {
      result = await db.execute({
        sql: "INSERT INTO msn (content) VALUES (:msn)",
        args: { msn: msg },
      });
    } catch (e) {
      console.error(e);
    }
    io.emit("chat", msg, result.lastInsertRowid.toString());
  });
});

// PATH server

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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
