import { Router } from "express";
import { Request, Response } from "express";
import pool from "../db/connection";

export const eventRouter = Router();

eventRouter.get("/", async (req: Request, res: Response) => {
  await pool.query("SELECT * FROM calendarevents", (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error in fetching events" });
    }
    return res.status(200).json(result.rows);
  });
});

eventRouter.post("/", async (req: Request, res: Response) => {
  const { user_id, title, description, start_date, end_date } = req.body;
  if (!user_id || !title || !description || !start_date || !end_date) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const response = await pool.query(
      "INSERT INTO calendarevents (user_id, title, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, title, description, start_date, end_date],
    );
    return res.status(201).json(response.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: "Error in creating event" });
  }
});

eventRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const response = await pool.query("SELECT * FROM calendarevents WHERE event_id = $1", [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json(response.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: "Error in fetching event" });
  }
});

eventRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, start_date, end_date } = req.body;
  if (!id && !title && !description && !start_date && !end_date) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const response = await pool.query(
      "UPDATE calendarevents SET title = $1, description = $2, start_date = $3, end_date = $4 WHERE event_id = $5 RETURNING *",
      [title, description, start_date, end_date, id],
    );
    return res.status(200).json(response.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: "Error in updating event" });
  }
});

eventRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Invalid input" });
  }
  try {
    const response = await pool.query("DELETE FROM calendarevents WHERE event_id = $1", [id]);
    if (response.rowCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Error in deleting event" });
  }
});
