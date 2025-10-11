import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const jobRouter = express.Router();

jobRouter.post("/post", isAuthenticated, postJob);
jobRouter.get("/", isAuthenticated, getAllJobs);
jobRouter.get("/getadmin-job", isAuthenticated, getAdminJobs);
jobRouter.get("/get/:id", isAuthenticated, getJobById);

export default jobRouter;
