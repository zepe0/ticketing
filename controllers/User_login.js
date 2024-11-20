import { db } from "../config/database.js";


async function User_login(user) {
  let result;

  try {
    if (user.email === "" || user.password === "") {
      throw new Error("Email o contraseña no definidos");
    }
    result = await db.execute({
      sql: "Select pws , email from user Where email = :email and pws = :pws",
      args: {     
        email: user.email,
        pws: user.password,
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
export default User_login;
