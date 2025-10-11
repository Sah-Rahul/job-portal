import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import Job from "../models/job.model.js";

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
  } = req.body;
  const userId = req.id;

  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    !jobType ||
    !experience ||
    !position ||
    !companyId
  ) {
    throw new ApiError(400, "Something is missing.");
  }

  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(","),
    salary: Number(salary),
    location,
    jobType,
    experienceLevel: experience,
    position,
    company: companyId,
    created_by: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, job, "Job created successfully."));
});

export const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      throw new ApiError(404, "Jobs not found.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, jobs, "Jobs fetched successfully."));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

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
