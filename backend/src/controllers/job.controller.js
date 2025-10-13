import Job from "../models/job.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import asyncHandler from "../utility/asyncHandler.js";

export const postJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experience,
    position,
    companyId,
    experienceLevel,
  } = req.body;

  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    !jobType ||
    !experience ||
    !position ||
    !companyId ||
    !experienceLevel
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const newJob = await Job.create({
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experience,
    position,
    company: companyId,
    experienceLevel,
    created_by: req.id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newJob, "Job posted successfully."));
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword?.trim() || "";

  const query = keyword
    ? {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  const jobs = await Job.find(query)
    .populate({
      path: "company",
    })
    .sort({ createdAt: -1 });

  if (!jobs || jobs.length === 0) {
    throw new ApiError(404, "No jobs found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Jobs fetched successfully."));
});

export const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;

  const job = await Job.findById(jobId).populate({
    path: "company",
  });

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job fetched successfully."));
});

export const getAdminJobs = asyncHandler(async (req, res) => {
  const adminId = req.id;

  const jobs = await Job.find({ created_by: adminId })
    .populate({
      path: "company",
    })
    .sort({ createdAt: -1 });

  if (!jobs || jobs.length === 0) {
    throw new ApiError(404, "No jobs found for this admin");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Admin jobs fetched successfully."));
});
