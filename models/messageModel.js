import { db } from "../config/database.js";

export const createMessage = async (content, user = null) => {
  return await db.execute({
    sql: "INSERT INTO msn (content, user) VALUES (:content, :user)",
    args: { content, user },
  });
};
