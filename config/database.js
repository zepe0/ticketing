import { createClient } from "@libsql/client";
import { loadEnv } from "./env.js";
import { generateUID } from "../utils/generateUid.js";

loadEnv();

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
  await db.execute(`
    CREATE TABLE IF NOT EXISTS user (
      uid TEXT PRIMARY KEY ,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      pws TEXT NOT NULL
    )
  `);
  const uid = generateUID();
  await db.execute({
    sql: "INSERT  OR IGNORE INTO user (uid,nombre,email,pws) VALUES (:uid,:nombre,:email,:pws)",
    args: {
      uid: uid,
      nombre: "demo",
      email: "demo@demo.es",
      pws: "demo",
    },
  });

  console.log("Database connected and table created");
};
