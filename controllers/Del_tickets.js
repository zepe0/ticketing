import { db } from "../config/database.js";
import { generateUID } from "../utils/generateUid.js";

async function Del_tickets(ticket, user) {
  let result;

 
  debugger;
  const { prioridad, departamento, des, email, estado, titulo } = user;
  try {
    result = await db.execute({
      sql: "DELETE FROM tickets WHERE uid = :uid",
      args: {
        uid: ticket,
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
export default Del_tickets;
