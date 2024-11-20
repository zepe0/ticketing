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
      nombre TEXT ,
      email TEXT UNIQUE NOT NULL,
      pws TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS tickets (
      uid TEXT PRIMARY KEY ,
      departamento TEXT ,
      email TEXT UNIQUE NOT NULL,
      des NOT NULL,
      creado date default current_date,
      estado TEXT NOT NULL,
      prioridad TEXT NOT NULL
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
  await db.execute({
    sql: "INSERT  OR IGNORE INTO tickets (uid,departamento,email,des, estado,prioridad) VALUES (:uid,:departamento,:email,:des,:estado,:prioridad)",
    args: {
      uid: uid,
      departamento: "IT",
      estado: "Abierto",
      prioridad: "alta",
      email: "demo@demo",
      des: "demo",
      email: "demo@demo",
    },
  });

  console.log("Database connected and table created");
};
