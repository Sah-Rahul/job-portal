import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, password, email, phoneNumber, role } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      password: hashedPassword,
      email,
      phoneNumber,
      role,
    });

    const userToReturn = {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: userToReturn,
    });
  } catch (error) {
    console.error("Register User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (role !== user.role) {
      return res.status(401).json({
        success: false,
        message: "Role does not match.",
      });
    }

    const tokenPayload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullName}`,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile || {},
      },
      token,
    });
  } catch (error) {
    console.error("Login User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Logged out successfully.",
      });
  } catch (error) {
    console.error("Logout User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User ID missing.",
      });
    }

    let { fullName, email, phoneNumber, location, bio, skills } = req.body;

   
    if (typeof skills === "string") {
      try {
        const parsed = JSON.parse(skills);
        skills = Array.isArray(parsed) ? parsed.map((s) => s.trim()) : [];
      } catch (err) {
        skills = skills.split(",").map((s) => s.trim());
      }
    }

    const files = req.files || {};
    const avatar = files?.avatar?.[0];
    const resume = files?.resume?.[0];

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

     
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.location = location || user.location;

     
    user.profile = user.profile || {};
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills = Array.isArray(skills)
      ? skills
      : user.profile.skills || [];

   
    if (avatar) {
      user.profile.avatar = avatar.path;
    }

    if (resume) {
      user.profile.resume = resume.path;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        location: user.location,
        role: user.role,
        profile: {
          bio: user.profile.bio,
          skills: user.profile.skills,
          avatar: user.profile.avatar,
          resume: user.profile.resume,
        },
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
