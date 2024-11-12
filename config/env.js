import fs from "fs-extra";

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
