export function loadEnv() {
  if (process.env.NODE_ENV !== "production") {
    process.loadEnvFile(".env");
    console.log(".env loaded for development");
  }
}
