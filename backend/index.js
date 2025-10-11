import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

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

// app.use(errorMiddleware);

const PORT = process.env.PORT || 4000

app.listen(() =>{
    console.log(`server running on ${PORT}✅ `)
})