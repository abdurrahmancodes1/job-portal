import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import getDataUri from "../utils/dataURI.js";
// import cloudinary from "../utils/imageKit.js";
// import imagekit from "../config/imagekit.js"

import path from "path";
import imagekit from "../utils/imageKit.js";

export const register = async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;
  console.log(fullName, email, phoneNumber, password, role);

  if (!fullName || !email || !phoneNumber || !password || !role) {
    console.log(fullName, email, phoneNumber, password, role);
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    console.log("File received:", req.file);

    const file = req.file;
    let uploadedImageUrl = "";
    if (file) {
      const uploadResponse = await imagekit.upload({
        file: file.buffer.toString("base64"),
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/profiles",
        useUniqueFileName: true,
      });
      console.log("Upload success:", uploadResponse);

      uploadedImageUrl = uploadResponse.url;
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: uploadedImageUrl,
      },
    });

    newUser.password = undefined;
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account does not exist with current role",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.password = undefined;

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
        user,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successful",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  const { fullName, email, phoneNumber, skills, bio } = req.body;
  const file = req.file;

  let skillsArray = [];
  if (Array.isArray(skills)) {
    skillsArray = skills;
  } else if (typeof skills === "string") {
    skillsArray = skills.split(",").map((s) => s.trim());
  }

  const userId = req.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skillsArray;
    if (bio) user.profile.bio = bio;

    // ✅ handle resume upload
    if (file) {
      const uploadResponse = await imagekit.upload({
        file: file.buffer.toString("base64"), // convert to base64
        fileName: file.originalname,
        folder: "/resumes", // optional, organizes in dashboard
        useUniqueFileName: true,
      });
      user.profile.resume = uploadResponse.url; // public, works in browser
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
