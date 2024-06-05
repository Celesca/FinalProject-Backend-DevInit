import { Request, Response, Router } from "express";
import pool from "../db/connection";
import bcrypt from "bcrypt";

export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const users = await pool.query("SELECT * FROM users");
  return res.status(200).json(users.rows);
});

userRouter.post("/register", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  const client = await pool.connect();
  // Check if the username already exists
  const existingUser = await client.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
  if (existingUser.rows.length > 0) {
    client.release();
    return res.status(400).json({ error: "Username already exists" });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await client.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *", [
    username,
    hashedPassword,
    email,
  ]);
  client.release();

  res.status(201).json(result.rows[0]);
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
  if (result.rows.length === 0) {
    client.release();
    return res.status(400).json({ error: "Invalid username or password" });
  }
  const user = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    client.release();
    return res.status(400).json({ error: "Invalid username or password" });
  } else {
    client.release();
    // Update last_login in users field
    await pool.query("UPDATE users SET last_login = NOW() WHERE username = $1", [username]);
    return res.status(200).json(user);
  }
});
