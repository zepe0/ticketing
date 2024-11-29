import { json } from "express";
import { db } from "../config/database.js";

async function worker_ticket(user) {
  let result;
  user = JSON.parse(atob(user.split(".")[1]));

  try {
    result = await db.execute({
      sql: "select * from tickets where asignado = :rol",
      args: {
        rol: user.id,
      },
    });

    return result;
  } catch (error) {
    if (error.code === "ARGS_INVALID") {
      console.error("Error en los argumentos de la consulta:", error.message);
    } else if (error === "Email o contraseña no definidos") {
      return error;
    } else if (error.code === "SERVER_ERROR") {
      console.error(
        "Error del servidor al intentar conectar con la base de datos:",
        error.message
      );
    } else {
      console.error("Error al insertar Usuario:", error);
    }
    throw error;
  }
}
export default worker_ticket;
