import jwt from "jsonwebtoken";
import asyncHandler from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    if (!userId) {
      throw new ApiError(401, "Invalid token payload");
    }

    req.id = userId;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid token");
  }
});
