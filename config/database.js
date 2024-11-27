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
      pws TEXT NOT NULL,
      rol INTEGER DEFAULT 0
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
      prioridad TEXT NOT NULL,
      asignado TEXT,
      titulo TEXT,      
      FOREIGN KEY (asignado) REFERENCES worker(uid)
  
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS worker (
      uid TEXT PRIMARY KEY ,
      nombre TEXT ,
      apellido TEXT ,
      email TEXT UNIQUE NOT NULL,
      pws TEXT NOT NULL,
      rol INTEGER DEFAULT 2,
      departamento TEXT,
      avatar TEXT
    )
  `);
  const uid = generateUID();
  await db.execute({
    sql: "INSERT OR IGNORE INTO user (uid,nombre,email,pws,rol) VALUES (:uid,:nombre,:email,:pws,:rol)",
    args: {
      uid: uid,
      nombre: "demo",
      email: "demo@demo.es",
      pws: "demo",
      rol: 1,
    },
  });

  console.log("Database connected and table created");
};
