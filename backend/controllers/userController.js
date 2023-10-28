import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import AgentCompany from "../models/agentCompanyModels.js";
import Banned from "../models/bannedModel.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  const bannedUser = await Banned.findOne({ email: email });
  if (bannedUser) {
    res.status(403);
    throw new Error("Banned user cannot be registered again");
  }
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  // If the user's role is agentCompany, create an entry in the AgentCompany model
  if (role === "agentCompany") {
    const agentCompany = new AgentCompany({
      name,
      email,
      password, // Make sure to handle password securely
      role,
    });
    await agentCompany.save();
  }
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out" });
});
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  res.status(200).json(user);
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role; // If you want to allow updating of the role
    // avatar
    const avatar = `public/uploads/${req.file.originalname}`;
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (user.role === "agentCompany") {
      const updatedAgentCompany = await AgentCompany.findOneAndUpdate(
        { email: user.email },
        {
          name: user.name,
          email: user.email,
        },
        { new: true, useFindAndModify: false } // Options to return the modified document and to use the new findOneAndUpdate method
      );

      if (!updatedAgentCompany) {
        const agentCompany = new AgentCompany({
          name: user.name,
          email: user.email,
          role: "agentCompany", // Set the role as necessary
          password: user.password, // Make sure to handle the password securely
          avatar: user.avatar, // Adjust based on your application requirements
        });
        await agentCompany.save();
      }
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
