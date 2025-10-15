import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
dotenv.config();

// routes
import ConnectDb from "./src/config/db.js";

import { errorMiddleware } from "./src/middleware/errorMiddleware.js";
import userRouter from "./src/routes/user.routes.js";
import companyRouter from "./src/routes/company.routes.js";
import jobRouter from "./src/routes/job.routes.js";
import applicationRouter from "./src/routes/application.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/temp", express.static("public/temp"));
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/company', companyRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/application', applicationRouter)
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  ConnectDb();
  console.log(`server running on ${PORT} ✅`);
});
