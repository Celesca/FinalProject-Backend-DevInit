import { Pool } from "pg";
import request from "supertest";

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "todo_db",
});

let test_user_id: number;
let test_todo_id: number;

describe("Log Unit Testing", () => {
  beforeAll(async () => {
    try {
      const response = await request("http://localhost:3000").post("/api/users/register").send({
        username: "testuser2",
        password: "password2",
        email: "test2@email.com",
      });
      test_user_id = response.body.user_id;
      const todoResponse = await request("http://localhost:3000").post("/api/todos").send({
        user_id: test_user_id,
        title: "Test First Log",
        description: "Unit Testing",
        due_date: "2021-10-10",
        priority: 5,
        status: "completed",
      });
      test_todo_id = todoResponse.body.todo_id;
    } catch (err) {
      console.error("Error in beforeAll:", err);
      throw err;
    }
  });

  afterAll(async () => {
    try {
      const client = await pool.connect();
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

  test("GET all logs for the users should return a 200 status code", async () => {
    try {
      const response = await request("http://localhost:3000").get(`/api/todos`);
      expect(response.status).toBe(200);
    } catch (err) {
      console.error("Error in GET all logs test:", err);
      throw err;
    }
  });

  test("Get log for a specific user should return a 200 status code", async () => {
    try {
      const response = await request("http://localhost:3000").get(`/api/todos/${test_todo_id}`);
      expect(response.status).toBe(200);
    } catch (err) {
      console.error("Error in GET log for specific user test:", err);
      throw err;
    }
  });

  test("POST a new log should return a 201 status code", async () => {
    try {
      const response = await request("http://localhost:3000").post("/api/todos").send({
        user_id: test_user_id,
        title: "Test Log",
        description: "Unit Testing",
        due_date: "2022-10-10",
        priority: 3,
        status: "pending",
      });
      expect(response.status).toBe(201);
      expect(response.body.user_id).toBe(test_user_id);
      expect(response.body.title).toBe("Test Log");
      expect(response.body.description).toBe("Unit Testing");
      expect(response.body.priority).toBe(3);
      expect(response.body.status).toBe("pending");
    } catch (err) {
      console.error("Error in POST log test:", err);
      throw err;
    }
  });

  test("PUT an existing log should return a 200 status code", async () => {
    try {
      const response = await request("http://localhost:3000").put(`/api/todos/${test_todo_id}`).send({
        title: "Updated Log",
        description: "Unit Testing",
        due_date: "2022-10-10",
        priority: 7,
        status: "completed",
      });
      expect(response.status).toBe(200);
      expect(response.body.todo_id).toBe(test_todo_id);
    } catch (err) {
      console.error("Error in PUT log test:", err);
      throw err;
    }
  });

  test("DELETE an existing log should return a 200 status code", async () => {
    try {
      const response = await request("http://localhost:3000").delete(`/api/todos/${test_todo_id}`);
      expect(response.status).toBe(200);
    } catch (err) {
      console.error("Error in DELETE log test:", err);
      throw err;
    }
  });
});
