import { Request, Response, Router } from "express";
import pool from "../db/connection";

export const logRouter = Router();

logRouter.get("/", async (req: Request, res: Response) => {
  const logs = await pool.query("SELECT * FROM dailylogs");
  return res.status(200).json(logs.rows);
});

logRouter.get("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.query;
  const logs = await pool.query("SELECT * FROM dailylogs WHERE user_id = $1", [user_id]);
  return res.status(200).json(logs.rows);
});

logRouter.post("/", async (req: Request, res: Response) => {
  const { user_id, content } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  const result = await pool.query("INSERT INTO dailylogs (user_id, content) VALUES ($1, $2) RETURNING *", [
    user_id,
    content,
  ]);
  return res.status(201).json(result.rows[0]);
});
