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

describe("Calendar Events Unit Testing", () => {
  beforeAll(async () => {
    try {
      const response = await request("http://localhost:3000").post("/api/users/register").send({
        username: "testuser3",
        password: "password3",
        email: "testuser3@email.com",
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
      await client.query("DELETE FROM users WHERE user_id = $1", [test_user_id]);
      client.release();
    } catch (err) {
      console.error("Error in afterAll:", err);
      throw err;
    }
  });

  test("GET all events should return an array of events", async () => {
    try {
      const response = await request("http://localhost:3000").get("/api/events");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    } catch (err) {
      console.error("Error in GET all events test:", err);
      throw err;
    }
  });

  test("POST new event should return the created event", async () => {
    try {
      const response = await request("http://localhost:3000").post("/api/events").send({
        user_id: test_user_id,
        title: "Test Event",
        description: "Test Description",
        start_date: "2021-08-01T00:00:00.000Z",
        end_date: "2021-08-01T23:59:59.000Z",
      });
      expect(response.status).toBe(201);
      // Delete
      const client = await pool.connect();
      await client.query("DELETE FROM calendarevents WHERE event_id = $1", [response.body.event_id]);
      client.release();
    } catch (err) {
      console.error("Error in POST new event test:", err);
      throw err;
    }
  });
});
