import fs from "fs-extra";
/**
 * 
 * 
 * Verifica si el archivo `.env` existe en el directorio raíz.
 * Si existe y el entorno no es de producción (`NODE_ENV !== "production"`),
 * lo carga para utilizar las variables de entorno definidas en dicho archivo.
 */
export function loadEnv() {
  // Verificar si el archivo .env existe
  
  const envPath = "./.env"; // Ruta al archivo .env

  if (fs.existsSync(envPath)) {
 
    process.loadEnvFile(envPath);
    console.log(".env loaded");
   
  } else {
    console.log(".env file does not exist.");
  }

  // Activar solo en modo desarrollo
}
