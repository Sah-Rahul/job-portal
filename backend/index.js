import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// routes 
import userRouter from "./src/routes/user.routes.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import ConnectDb from "./src/config/db.js";


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

app.use('/api/v1/auth/', userRouter);

app.use(errorMiddleware);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    ConnectDb()
    console.log(`server running on ${PORT} ✅`);
});
