import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { createCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js";
 
const companyRouter = express.Router();

companyRouter.post("/create-company", isAuthenticated, createCompany);
companyRouter.get("/get", isAuthenticated, getCompany);
companyRouter.get("/get/:id", isAuthenticated, getCompanyById);
companyRouter.put("/update/:id", isAuthenticated, updateCompany);

export default companyRouter;
