import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { sendToken } from "../utilis/sendTokens.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;

  if (!fullName || !email || !phoneNumber || !password || !role) {
    throw new ApiError(400, "Something is missing");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email.");
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
    .json(new ApiResponse(201, "Account created successfully."));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  // Validation
  if (!email || !password || !role) {
    throw new ApiError(400, "Something is missing");
  }

  let user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Incorrect email or password.");
  }

  // Compare password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Incorrect credentials");
  }

  if (role !== user.role) {
    throw new ApiError(400, "Account doesn't exist with current role.");
  }

  sendToken(user, 200, res, `Welcome back ${user.fullName}`);
});

export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { maxAge: 0 })
    .json(new ApiResponse(200, null, "Logged out successfully."));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, bio, skills } = req.body;
  const file = req.file;
  const userId = req.id;

  // Check if skills is provided and is a string, else use empty array
  const skillsArray = skills && typeof skills === "string" ? skills.split(",") : [];

  // Build update object including nested fields
  const updateData = {
    fullName,
    email,
    phoneNumber,
    "profile.bio": bio,
    "profile.skills": skillsArray,
  };

  // Use findByIdAndUpdate with { new: true } to get the updated doc back
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

