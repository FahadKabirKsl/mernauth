// Import necessary modules and models
import asyncHandler from "express-async-handler";
import Agent from "../models/agentModel.js";
import AgentCompany from "../models/agentCompanyModels.js";

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
// const banAgent = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Implement the logic to ban the agent with the provided id
//     // Example: await Agent.findByIdAndUpdate(id, { isBanned: true });
//     res.json({ message: "Agent banned successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// Controller function to ban an agent company
// const banAgentCompany = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Implement the logic to ban the agent company with the provided id
//     // Example: await AgentCompany.findByIdAndUpdate(id, { isBanned: true });
//     res.json({ message: "Agent company banned successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });
// const banAgent = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const agent = await Agent.findByIdAndUpdate(id, { isBanned: true });
//     console.log("Banned Agent ID:", agent._id);
//     res.json({ message: "Agent banned successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });
const banAgent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const agent = await Agent.findById(id);
    if (agent) {
      agent.isBanned = true; // Update the isBanned field
      await agent.save(); // Save the updated agent
      console.log("Banned Agent ID:", agent._id);
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
      agentCompany.isBanned = true; // Update the isBanned field
      await agentCompany.save(); // Save the updated agent company
      console.log("Banned Agent Company ID:", agentCompany._id);
      res.json({ message: "Agent company banned successfully" });
    } else {
      res.status(404).json({ message: "Agent company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


export { getAllAgents, getAllAgentCompanies, banAgent, banAgentCompany };
