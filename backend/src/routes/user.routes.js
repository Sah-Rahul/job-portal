import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js";
 
const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

userRouter.put("/update-profile", isAuthenticated, updateProfile);

export default userRouter;
