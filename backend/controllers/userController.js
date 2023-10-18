import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import AgentCompany from "../models/agentCompanyModels.js";

// @desc Auth user/set token
// route POST /api/users/auth
// access Public
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

// @desc register new user
// route POST /api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
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

// @desc logout
// route POST /api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out" });
});

// @desc get user profile
// route GET /api/users/profile
// access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  res.status(200).json(user);
});

// @desc update user profile
// route PUT /api/users/profile
// access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role; // If you want to allow updating of the role

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
