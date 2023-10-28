import asyncHandler from "express-async-handler";
import path from "path";
import fs from "fs";
import User from "../models/userModel.js";
import Agent from "../models/agentModel.js";
import AgentCompany from "../models/agentCompanyModels.js"; // Assuming you have an AgentCompany model
import Banned from "../models/bannedModel.js";
// Controller function for adding agents
const addAgent = asyncHandler(async (req, res) => {
  const { name, email, nid, address, number } = req.body;

  let agentAvatar;
  if (req.file) {
    const tempPath = req.file.path;
    const targetPath = path.join("uploads", `${req.file.originalname}`);

    fs.rename(tempPath, targetPath, (err) => {
      if (err) throw err;
      console.log("Upload completed!");
    });

    agentAvatar = targetPath;
  }
  // Check if the requesting user is an agent company
  if (req.user.role !== "agentCompany") {
    res.status(401);
    throw new Error("Not authorized to add agents");
  }
  // Logic to check if the agent's email, number, or nid is banned
  const bannedAgent = await Banned.findOne({
    $or: [
      { email: email, isAgent: true },
      { number: number, isAgent: true },
      { nid: nid, isAgent: true },
    ],
  });
  if (bannedAgent) {
    res.status(403);
    throw new Error("Banned agent cannot be added again");
  }
  // Check if the agent with the same email, number, or nid already exists
  const existingAgent = await Agent.findOne({
    $or: [{ email: email }, { number: number }, { nid: nid }],
  });

  if (existingAgent) {
    res.status(400);
    throw new Error("Agent already exists");
  }
  const agentCompany = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  const agent = await Agent.create({
    name,
    agentCompany,
    email,
    nid,
    number,
    address,
    agentAvatar,
  });

  if (agent) {
    // console.log("New Agent Added: ", agent);
    res.status(201).json(agent);
  } else {
    res.status(400);
    throw new Error("Invalid agent data");
  }
});
const getAllAgents = asyncHandler(async (req, res) => {
  if (
    req.user.role !== "moneyLendingCompany" &&
    req.user.role !== "moneyLendingIndividual"
  ) {
    res.status(401);
    throw new Error("Not authorized to view agents");
  }

  const agents = await Agent.find({}).populate("agentCompany");
  res.json(agents);
});
// Controller function to get all agents for the current agent company
const getAgentsForCompany = asyncHandler(async (req, res) => {
  if (req.user.role !== "agentCompany") {
    res.status(401);
    throw new Error("Not authorized to view agents");
  }

  // console.log("Current user ID: ", req.user._id); // Check the current user ID
  // Assuming the agentCompany field in the Agent schema references the AgentCompany model correctly
  const agents = await Agent.find({ "agentCompany.id": req.user._id });

  // console.log("Agents: ", agents); // Check the resulting agents

  res.json(agents);
});
// Controller function to get all agent companies
const getAllAgentCompanies = asyncHandler(async (req, res) => {
  if (req.user.role === "agentCompany") {
    res.status(401);
    throw new Error("Not authorized to view agent companies");
  }

  const agentCompanies = await AgentCompany.find({});
  res.json(agentCompanies);
});
// Controller function to report agent as fraud/good with an incident
const reportAgent = asyncHandler(async (req, res) => {
  const { incident, isGood } = req.body;
  if (
    req.user.role !== "moneyLendingCompany" &&
    req.user.role !== "moneyLendingIndividual"
  ) {
    res.status(401);
    throw new Error("Not authorized to report agents");
  }
  const agent = await Agent.findById(req.params.id);
  if (agent) {
    agent.incident = incident;
    agent.isGood = isGood;
    await agent.save();
    // Update AgentCompany table if necessary
    if (agent.agentCompanyName) {
      const agentCompany = await AgentCompany.findById(agent.agentCompanyName);
      if (agentCompany) {
        agentCompany.incident = incident;
        agentCompany.isGood = isGood;
        await agentCompany.save();
      }
    }

    res.json({ message: "Agent reported successfully" });
  } else {
    res.status(404);
    throw new Error("Agent not found");
  }
});
// Controller function to report agent company as fraud/good with an incident
const reportAgentCompany = asyncHandler(async (req, res) => {
  const { incident, isGood } = req.body;

  if (
    req.user.role !== "moneyLendingCompany" &&
    req.user.role !== "moneyLendingIndividual"
  ) {
    res.status(401);
    throw new Error("Not authorized to report agent companies");
  }

  const agentCompany = await AgentCompany.findById(req.params.id);

  if (agentCompany) {
    agentCompany.incident = incident;
    agentCompany.isGood = isGood;
    await agentCompany.save();

    res.json({ message: "Agent company reported successfully" });
  } else {
    res.status(404);
    throw new Error("Agent company not found");
  }
});
export {
  addAgent,
  getAllAgents,
  getAllAgentCompanies,
  reportAgent,
  reportAgentCompany,
  getAgentsForCompany,
};
