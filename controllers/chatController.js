import { db } from "../config/database.js";

export default function chatController(io) {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {});

    socket.on("chat", async (msg) => {
      debugger
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
