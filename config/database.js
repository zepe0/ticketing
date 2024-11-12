import { createClient } from "@libsql/client";
import { loadEnv } from "./env.js";

loadEnv()

export const db = createClient({
  url: "libsql://firm-katana-zepe0.turso.io",
  authToken: process.env.DB_TOKEN,
});

db.connect = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS msn (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT,
      user TEXT
    )
  `);
  console.log("Database connected and table created");
};
