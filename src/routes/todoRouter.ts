import { Router } from "express";
import pool from "../db/connection";

export const todoRouter = Router();

todoRouter.get("/", async (req, res) => {
  const todos = await pool.query("SELECT * FROM todolists");
  return res.status(200).json(todos.rows);
});

todoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await pool.query("SELECT * FROM todolists WHERE todo_id = $1", [id]);
  if (todo.rows.length === 0) {
    return res.status(404).json({ error: "Todo not found" });
  }
  return res.status(200).json(todo.rows[0]);
});

todoRouter.post("/", async (req, res) => {
  const { user_id, title, description, due_date, priority } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  if (!title || !description || !due_date || !priority) {
    return res.status(400).json({ error: "Invalid body" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO todolists (user_id, title, description, due_date, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, title, description, due_date, priority],
    );
    if (result.rows.length === 0) {
      return res.status(500).json({ error: "Failed to create todo" });
    }
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in create todo:", err);
    throw err;
  }
});

todoRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, priority } = req.body;
  try {
    const todo = await pool.query("SELECT * FROM todolists WHERE todo_id = $1", [id]);
    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (!title && !description && !due_date && !priority) {
      return res.status(400).json({ error: "Invalid body" });
    }

    const result = await pool.query(
      "UPDATE todolists SET title = $1, description = $2, due_date = $3, priority = $4 WHERE todo_id = $5 RETURNING *",
      [title, description, due_date, priority, id],
    );
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error in update todo:", err);
    throw err;
  }
});

todoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todolists WHERE todo_id = $1", [id]);
    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    const result = await pool.query("DELETE FROM todolists WHERE todo_id = $1", [id]);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error in delete todo:", err);
    throw err;
  }
});
