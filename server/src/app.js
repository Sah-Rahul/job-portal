import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// routes imports

const app = express();

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.json({
    name: "rahul"
  });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(errorMiddleware);
export default app;
