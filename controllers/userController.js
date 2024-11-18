import { db } from "../config/database.js";
import { generateUID } from "../utils/generateUid.js";

export default function userController(io) {
  io.on("connection", (socket) => {
    socket.on("login", async (user) => {
      console.log(user);
      let result;
      try {
        result = await db.execute({
          sql: "INSERT INTO user (uid,nombre,email,pws) VALUES (:uid,:nombre,:email,:pws)",
          args: {
            uid: generateUID(),
            nombre: user.name,
            email: user.email,
            contraseña: user.pws,
          },
        });
      } catch (e) {
        if (error.code === "ARGS_INVALID") {
          console.error(
            "Error en los argumentos de la consulta:",
            error.message
          );
        } else if (error.code === "SERVER_ERROR") {
          console.error(
            "Error del servidor al intentar conectar con la base de datos:",
            error.message
          );
        } else {
          console.error("Error al insertar Usuario:", error);
        }
      }
    });
  });
}