import { db } from "../config/database.js";

async function All_workers_Admin(user) {
  let result;

  try {
    result = await db.execute({
      sql: "select * from worker ",
      args: {
        
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
export default All_workers_Admin;
