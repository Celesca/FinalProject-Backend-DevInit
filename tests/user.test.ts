import { Pool } from "pg";
import request from "supertest";

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "todo_db",
});

const deleteUser = async (username: string) => {
  const client = await pool.connect();
  await client.query("DELETE FROM users WHERE username = $1", [username]);
  client.release();
};

const registerUser = async (username: string, password: string, email: string) => {
  const response = await request("http://localhost:3000")
    .post("/api/users/register")
    .send({ username, password, email });
  return response;
};

const loginUser = async (username: string, password: string) => {
  const response = await request("http://localhost:3000").post("/api/users/login").send({ username, password });
  return response;
};

describe("User Unit Testing", () => {
  afterAll(async () => {
    await pool.end();
  });

  test("Postgres DB Connection should establish a successful pg db connection", async () => {
    const client = await pool.connect();
    expect(client).toBeTruthy();
    client.release();
  });

  test("Register new user with valid data", async () => {
    const response = await registerUser("testuser", "password", "test@email.com");

    expect(response.status).toBe(201);
    expect(response.body.username).toBe("testuser");
    await deleteUser("testuser");
  });

  test("Register new user with existing username", async () => {
    await registerUser("testuser", "password", "test@email.com");
    const response = await registerUser("testuser", "testpassword", "test123@email.com");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Username already exists");
    await deleteUser("testuser");
  });

  test("Login with correct credentials", async () => {
    await registerUser("testuser", "password", "test@email.com");
    const response = await loginUser("testuser", "password");

    expect(response.status).toBe(200);
    expect(response.body.username).toBe("testuser");
    await deleteUser("testuser");
  });

  test("Login with incorrect credentials", async () => {
    await registerUser("testuser", "password", "test@email.com");

    const response = await loginUser("testuser", "wrongpassword");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid username or password");
    await deleteUser("testuser");
  });
});
