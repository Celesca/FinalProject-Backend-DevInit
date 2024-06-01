// Import the required modules
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "todo_db",
});

// Define the test
describe("Postgres DB Connection", () => {
  test("should establish a successful pg db connection", async () => {
    const client = await pool.connect();

    expect(client).toBeTruthy();
    client.release();
  });

  test("GET /users should return a list of users", async () => {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");

    expect(result.rows).toBeTruthy();
    client.release();
  });
});
