import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config";
import errorHandler from "./middleware/errorHandler";
import complaintRouter from "./routes/complaintRoutes";
import categoryRouter from "./routes/categoryRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(cors({ origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "http://localhost:3000", credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running at ${process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : `http://localhost:${PORT}`}`);
});

//* Endpoints API
app.use("/api/complaints", complaintRouter);
app.use("/api/categories", categoryRouter);

//* Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server up and running at ${process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : `http://localhost:${PORT}`}`);
});
