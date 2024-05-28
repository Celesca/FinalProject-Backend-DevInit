// Import the required modules
import { Pool } from "pg";

// Define the test
describe("Postgres DB Connection", () => {
  it("should establish a successful pg db connection", async () => {
    // Create a new connection pool
    const pool = new Pool({
      user: "postgres",
      password: "postgres",
      host: "localhost",
      port: 5432,
      database: "todo_db",
    });

    // Attempt to connect to the database
    const client = await pool.connect();

    // Verify the connection
    expect(client).toBeTruthy();

    // Release the client
    client.release();
  });
});
