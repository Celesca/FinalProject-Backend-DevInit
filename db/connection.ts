import { Pool } from "pg";

export const connectToDB = async () => {
  const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "todo_db",
  });

  const client = await pool.connect();
  client.release();

  return true;
};
