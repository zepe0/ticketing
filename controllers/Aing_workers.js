import { json } from "express";
import { db } from "../config/database.js";

async function Asing_workers(uid, asignado) {
  let result;
  debugger;
  try {
    result = await db.execute({
      sql: "update tickets set asignado = :worker where uid = :id",
      args: {
        id: uid,
        worker: asignado,
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
export default Asing_workers;
