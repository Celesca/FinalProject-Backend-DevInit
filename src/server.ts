import express, { Response, Request } from "express";
import { userRouter } from "./routes/userRouter";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(morgan("dev"));

const port = process.env.PORT || 3000;

app.use("/api/users", userRouter);

app.get("/health", (req: Request, res: Response) => {
  res.send(`Hello, TypeScript with Express!`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
