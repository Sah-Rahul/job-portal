import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicaion.controller.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply-job/:id", isAuthenticated, applyJob);

applicationRouter.get("/", isAuthenticated, getAppliedJobs);

applicationRouter.get("/get-appplicant/:id", isAuthenticated, getApplicants);

applicationRouter.put("/update-status/:id", isAuthenticated, updateStatus);

export default applicationRouter;
