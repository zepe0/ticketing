import { db } from "../config/database.js";

export default function chatController(io) {
  io.on("connection", (socket) => {
    console.log("Usuario Conectado");

    socket.on("disconnect", () => {
      console.log("Usuario Desconectado");
    });

    socket.on("chat", async (msg) => {
      let result;
      try {
        result = await db.execute({
          sql: "INSERT INTO msn (content) VALUES (:msg)",
          args: { msg },
        });
        io.emit("chat", msg, result.lastInsertRowid.toString());
      } catch (e) {
        console.error("Error al guardar mensaje:", e);
      }
    });
  });
}
