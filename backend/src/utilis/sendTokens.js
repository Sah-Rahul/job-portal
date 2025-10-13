import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const sendToken = (
  user,
  statusCode,
  res,
  message = "Logged in successfully"
) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || "5d";
  const days = parseInt(expiresIn);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn,
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: days * 24 * 60 * 60 * 1000,
  };

  return res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    token,
  });
};
