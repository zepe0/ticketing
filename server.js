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
import User_login from "./controllers/User_login.js";
import tickets from "./routes/tickets.js";
import workers from "./routes/workers.js";

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
app.use("/api", tickets);
app.use("/workers", workers);
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    await User_register({ email, password });
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(203).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User_login({ email, password });
    if (token === "Usuario no encontrado") {
      return res.status(203).json({ error: "Usuario no encontrado" });
    }
    return res
      .status(201)
      .json({ message: "Usuario logeado correctamente", token: token });
  } catch (error) {
    res.status(203).json({ error: error.message });
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
import { GoogleGenerativeAI } from "@google/generative-ai";
let history = ""
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/* const countResult = await model.countTokens(
  "The quick brown fox jumps over the lazy dog.",
);
const prompt = "cuantos tokens tengo en mi cuenta"; */
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "qeu actividaad puedo hacer hoy" }],
    },
    {
      role: "model",
      parts: [{ text: "que te gusta hacer" }],
    },
  ],
  generationConfig: {
    maxOutputTokens: 100,
  },
});

const msg = "";

const result = await chat.sendMessage(msg);
const response = await result.response;
const text = response.text();
console.log(text);

/* const result = await model.generateContent(prompt); */
/* console.log(result.response.text()); */

chat._history.forEach((msg) => {
  console.log(msg);
});