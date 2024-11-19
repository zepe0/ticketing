import express, { json } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { db } from "./config/database.js";
import path from "path";

import chatController from "./controllers/chatController.js";
import viewRoutes from "./routes/views.js";
import { loadEnv } from "./config/env.js";
import userController from "./controllers/userController.js";
import User_register from "./controllers/User_register.js";
import { error } from "node:console";

loadEnv();

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

db.connect();
chatController(io);
userController(io);
app.use(express.json());
// Rutas de vistas
app.use("/", viewRoutes);
app.post("/register", async (req, res) => {
  const { email,  password } = req.body;
  try {
    await User_register({ email,password });
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(501).json(error.message);
  }
});
app.use(
  express.static(path.join(process.cwd(), "client"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
      if (filePath.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
    },
  })
);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
