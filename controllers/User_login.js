import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
import { loadEnv } from "../config/env.js";

async function User_login(user) {
  let result;

  loadEnv();
  try {
    if (user.email === "" || user.password === "") {
      throw new Error("Email o contraseña no definidos");
    }
    result = await db.execute({
      sql: "Select pws , email ,uid ,rol from user Where email = :email and pws = :pws",
      args: {
        email: user.email,
        pws: user.password,
      },
    });
    debugger;
    if (result.rows.length === 0) {
      return "Usuario no encontrado";
    } else {
      const token = jwt.sign(
        {
          email: result.rows[0].email,
          nombre: result.rows[0].nombre,
          id: result.rows[0].uid,
          rol: result.rows[0].rol,
        },
        process.env.JWT_SECRET
      );
      debugger
      return token;
    }
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
