import { Request, Response, Router } from "express";
import pool from "../db/connection";

export const logRouter = Router();

logRouter.get("/", async (req: Request, res: Response) => {
  const logs = await pool.query("SELECT * FROM dailylogs");
  if (logs.rows.length === 0) {
    return res.status(404).json({ error: "No logs found" });
  }
  return res.status(200).json(logs.rows);
});

logRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const log = await pool.query("SELECT * FROM dailylogs WHERE log_id = $1", [id]);
  if (log.rows.length === 0) {
    return res.status(404).json({ error: "Log not found" });
  }
  return res.status(200).json(log.rows[0]);
});

logRouter.post("/", async (req: Request, res: Response) => {
  const { user_id, content } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  try {
    const result = await pool.query("INSERT INTO dailylogs (user_id, content) VALUES ($1, $2) RETURNING *", [
      user_id,
      content,
    ]);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in create log:", err);
    return res.status(500).json({ error: "Failed to create log" });
  }
});

logRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const log = await pool.query("SELECT * FROM dailylogs WHERE log_id = $1", [id]);
    if (log.rows.length === 0) {
      return res.status(404).json({ error: "Log not found" });
    }
    await pool.query("DELETE FROM dailylogs WHERE log_id = $1", [id]);
    return res.status(200).json({ message: "Log deleted" });
  } catch (err) {
    console.error("Error in delete log:", err);
    return res.status(500).json({ error: "Failed to delete log" });
  }
});

logRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const log = await pool.query("SELECT * FROM dailylogs WHERE log_id = $1", [id]);
    if (log.rows.length === 0) {
      return res.status(404).json({ error: "Log not found" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }
    await pool.query("UPDATE dailylogs SET content = $1 WHERE log_id = $2 RETURNING *", [content, id]);
    return res.status(200).json({ message: "Log updated" });
  } catch (err) {
    console.error("Error in update log:", err);
    return res.status(500).json({ error: "Failed to update log" });
  }
});
