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
