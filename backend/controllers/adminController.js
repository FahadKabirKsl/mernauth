// Import necessary modules and models
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Agent from "../models/agentModel.js";
import AgentCompany from "../models/agentCompanyModels.js";
import Banned from "../models/bannedModel.js";
// Controller function to get all agents
const getAllAgents = asyncHandler(async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Controller function to get all agent companies
const getAllAgentCompanies = asyncHandler(async (req, res) => {
  try {
    const agentCompanies = await AgentCompany.find({});
    res.json(agentCompanies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Controller function to ban an agent
const banAgent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const agent = await Agent.findById(id);
    if (agent) {
      // Logic to create the banned entity
      await Banned.create({
        email: agent.email,
        number: agent.number,
        nid: agent.nid,
        isAgent: true,
        isCompany: false,
      });
      await Agent.findByIdAndRemove(id);
      res.json({ message: "Agent banned successfully" });
    } else {
      res.status(404).json({ message: "Agent not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
const banAgentCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const agentCompany = await AgentCompany.findById(id);
    if (agentCompany) {
      // Logic to create the banned entity
      await Banned.create({
        email: agentCompany.email,
        isAgent: false,
        isCompany: true,
      });

      // Logic to remove the agent company from the database
      await AgentCompany.findByIdAndRemove(id);

      // Logic to find and remove the user associated with the agent company
      const user = await User.findOne({ email: agentCompany.email });
      if (user) {
        await User.findByIdAndRemove(user._id);
      }

      res.json({ message: "Agent company banned successfully" });
    } else {
      res.status(404).json({ message: "Agent company not found" });
    }
  } catch (error) {
    console.error("Error banning agent company:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



export { getAllAgents, getAllAgentCompanies, banAgent, banAgentCompany };
