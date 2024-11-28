import { json } from "express";
import { db } from "../config/database.js";

async function Upd_status(data) {
  let result;
  let fecha_Actual;
  const new_status = data.estado === "abierto" ? "cerrado" : "abierto";
  if (new_status === "cerrado") {
    fecha_Actual = new Date( ).toISOString().slice(0, 10).split('-').reverse().join('/');;

    debugger
  }else{

    fecha_Actual = null;
  }
  try {
    result = await db.execute({
      sql: "update tickets set estado = :estado ,fecha_resuelto = :fecha where uid = :id",
      args: {
        id: data.id,
        estado: new_status,
        fecha: fecha_Actual,
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
