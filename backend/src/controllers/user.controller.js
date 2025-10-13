import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import asyncHandler from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { sendToken } from "../utility/sendToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;

  if (!fullName || !email || !phoneNumber || !password || !role) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullName,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });

  const userData = {
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    phoneNumber: newUser.phoneNumber,
    role: newUser.role,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, userData, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "Email and password are required.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials.");
  }

  if (role !== user.role) {
    throw new ApiError(401, "Account doesn't exit this current role.");
  }
  sendToken(res, user, "Logged in successfully");
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jobPortal-token");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully."));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, bio, skills } = req.body;
  const userId = req.id;
  const file = req.file;

  const skillsArray =
    skills && typeof skills === "string" ? JSON.parse(skills) : [];

  const updateData = {
    fullName,
    email,
    phoneNumber,
    "profile.bio": bio,
    "profile.skills": skillsArray,
  };

  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const updatedUser = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully."));
});
