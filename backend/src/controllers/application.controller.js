import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = asyncHandler(async (req, res) => {
  const userId = req.id;
  const jobId = req.params.id;

  if (!jobId) {
    throw new ApiError(400, "Job id is required");
  }

  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  });

  if (existingApplication) {
    throw new ApiError(400, "You have already applied for this job");
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
  });

  job.applications.push(newApplication._id);
  await job.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newApplication,
        "Application submitted successfully."
      )
    );
});

export const getAppliedJobs = asyncHandler(async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application || application.length === 0) {
      throw new ApiError(404, "No Applications found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, application, "Applications fetched successfully.")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getApplicants = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      throw new ApiError(404, "Job not found.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, job, "Applicants fetched successfully."));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const updateStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      throw new ApiError(400, "Status is required");
    }

    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      throw new ApiError(404, "Application not found");
    }

    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json(new ApiResponse(200, application, "Status updated successfully."));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || "Something went wrong");
  }
});
