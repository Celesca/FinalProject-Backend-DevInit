import { Pool } from "pg";
import request from "supertest";

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "todo_db",
});

const addLog = async (user_id: number, content: string) => {
  try {
    const response = await request("http://localhost:3000").post("/api/logs").send({ user_id, content });
    return response;
  } catch (err) {
    console.error("Error adding log:", err);
    throw err;
  }
};

let test_user_id: number;

describe("Log Unit Testing", () => {
  beforeAll(async () => {
    try {
      const response = await request("http://localhost:3000").post("/api/users/register").send({
        username: "testuser",
        password: "password",
        email: "test@email.com",
      });
      test_user_id = response.body.user_id;
    } catch (err) {
      console.error("Error in beforeAll:", err);
      throw err;
    }
  });

  afterAll(async () => {
    try {
      const client = await pool.connect();
      await client.query("DELETE FROM dailylogs WHERE user_id = $1", [test_user_id]);
      await client.query("DELETE FROM users WHERE user_id = $1", [test_user_id]);
      client.release();
    } catch (err) {
      console.error("Error in afterAll:", err);
      throw err;
    }
  });

  test("Postgres DB Connection should establish a successful pg db connection", async () => {
    try {
      const client = await pool.connect();
      expect(client).toBeTruthy();
      client.release();
    } catch (err) {
      console.error("Error in DB connection test:", err);
      throw err;
    }
  });

  test("Get all logs for a user", async () => {
    try {
      const response = await request("http://localhost:3000").get("/api/logs");
      expect(response.status).toBe(200);
    } catch (err) {
      console.error("Error in get logs test:", err);
      throw err;
    }
  });

  test("Add a new log entry", async () => {
    console.log("test_user_id:", test_user_id);
    try {
      const response = await addLog(test_user_id, "Test log entry");
      expect(response.status).toBe(201);
      expect(response.body.user_id).toBe(test_user_id);
      expect(response.body.content).toBe("Test log entry");
    } catch (err) {
      console.error("Error in add log test:", err);
      throw err;
    }
  });
});
