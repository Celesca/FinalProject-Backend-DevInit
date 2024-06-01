import { Request, Response, Router } from "express";
import pool from "../db/connection";

export const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const client = await pool.connect();
  // Check if the username already exists
  const existingUser = await client.query("SELECT * FROM users WHERE username = $1", [username]);
  if (existingUser.rows.length > 0) {
    client.release();
    return res.status(400).json({ error: "Username already exists" });
  }
  const result = await client.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [
    username,
    password,
  ]);
  client.release();

  res.status(201).json(result.rows[0]);
});

userRouter.get("/users", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users"); // Adjust the query as necessary
    client.release();

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  res.send("Login route");
});
