import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import Company from "../models/company.model.js";

export const createCompany = asyncHandler(async (req, res) => {
  const { companyName, website, location } = req.body;

  let company = await Company.findOne({ name: companyName });
  if (company) {
    throw new ApiError(409, "Company name already exists.");
  }

  if (!req.id) {
    throw new ApiError(401, "User ID not found in request.");
  }

  company = await Company.create({
    name: companyName,
    website,
    location,
    userId: req.id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, company, "Company created successfully."));
});

export const getCompanies = asyncHandler(async (req, res) => {
  const userId = req.id;

  const companies = await Company.find({ userId });

  if (!companies.length) {
    throw new ApiError(404, "No companies found for this user.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, companies, "Companies fetched successfully."));
});

export const getCompanyById = asyncHandler(async (req, res) => {
  const companyId = req.params.companyId;

  const company = await Company.findById(companyId);

  if (!company) {
    throw new ApiError(404, "Company not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, company, "Company fetched successfully."));
});

export const updateCompany = asyncHandler(async (req, res) => {
  const companyId = req.params.companyId;
  const { name, description, website, location } = req.body;
  const file = req.file;

  const updateData = {
    ...(name && { name }),
    ...(description && { description }),
    ...(website && { website }),
    ...(location && { location }),
  };

  const updatedCompany = await Company.findByIdAndUpdate(
    companyId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedCompany) {
    throw new ApiError(404, "Company not found or update failed.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCompany, "Company updated successfully.")
    );
});
