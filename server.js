import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { db } from "./config/database.js";
import { loadEnv } from "./config/env.js"; // Cargar .env en modo dev
import chatController from "./controllers/chatController.js";
import viewRoutes from "./routes/views.js";

loadEnv();

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

// Inicia la base de datos y escucha eventos de Socket.io
db.connect();
chatController(io);

// Rutas de vistas
app.use("/", viewRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
