import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { createCompany, getCompanies, getCompanyById, updateCompany } from "../controllers/company.controller.js";
 
const companyRouter = express.Router();

companyRouter.post("/create-company", isAuthenticated, createCompany);
companyRouter.get("/get", isAuthenticated, getCompanies);
companyRouter.get("/get/:companyId", isAuthenticated, getCompanyById);
companyRouter.put("/update/:companyId", isAuthenticated, updateCompany);

export default companyRouter;
