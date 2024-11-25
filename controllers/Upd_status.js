import { json } from "express";
import { db } from "../config/database.js";

async function Upd_status(data) {
  let result;
  const new_status = data.estado === "open" ? "cerrado" : "abierto"; 
  //TODO: Cambiar el estado de un ticket
  try {
    result = await db.execute({
      sql: "update tickets set estado = :estado where uid = :id",
      args: {
        id: data.id,
        estado: new_status,
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
export default Upd_status;
