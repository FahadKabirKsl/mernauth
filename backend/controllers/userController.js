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

// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.role = req.body.role || user.role;
//     user.number = req.body.number || user.number;
//     user.cid = req.body.cid || user.cid;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }
//     if (req.file) {
//       user.avatar = `/uploads/${req.file.originalname}`;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       number: updatedUser.number,
//       cid: updatedUser.cid,
//       avatar: updatedUser.avatar,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // Extracting email, number, and cid from the request body
  const { email, number, cid } = req.body;

  // Checking if the email, number, and cid already exist for other users
  const userWithSameEmail = await User.findOne({ email });
  const userWithSameNumber = await User.findOne({ number });
  const userWithSameCid = await User.findOne({ cid });

  // If a user with the same email, number, or cid is found and it's not the current user, throw an error
  if (
    userWithSameEmail &&
    userWithSameEmail._id.toString() !== user._id.toString()
  ) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  if (
    userWithSameNumber &&
    userWithSameNumber._id.toString() !== user._id.toString()
  ) {
    res.status(400);
    throw new Error("Number is already in use");
  }

  if (
    userWithSameCid &&
    userWithSameCid._id.toString() !== user._id.toString()
  ) {
    res.status(400);
    throw new Error("CID is already in use");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.number = req.body.number || user.number;
    user.cid = req.body.cid || user.cid;
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.file) {
      user.avatar = `/uploads/${req.file.originalname}`;
    }

    const updatedUser = await user.save();

    if (user.role === "agentCompany") {
      const agentCompany = await AgentCompany.findOne({ email: user.email });
      if (agentCompany) {
        agentCompany.name = user.name;
        agentCompany.email = user.email;
        agentCompany.number = user.number;
        agentCompany.cid = user.cid;
        agentCompany.avatar = user.avatar;

        await agentCompany.save();
      }
    }

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      number: updatedUser.number,
      cid: updatedUser.cid,
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
