import { db } from "../config/database.js";
import { generateUID } from "../utils/generateUid.js";

async function New_tickets(user) {
  let result;

  const uid = generateUID();
  const { prioridad, departamento, des, titulo, estado, email } = user;
  try {
    result = await db.execute({
      sql: "Insert into tickets (uid,departamento,des,email,estado,prioridad,titulo) VALUES (:uid,:departamento,:des,:email,:estado,:prioridad,:titulo)",
      args: {
        uid: uid,
        departamento: departamento,
        estado: estado,
        prioridad: prioridad,
        des: des,
        titulo: titulo,
        email: email,
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
export default New_tickets;
