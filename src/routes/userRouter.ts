import { Request, Response, Router } from "express";

export const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  res.send("Register route");
});
