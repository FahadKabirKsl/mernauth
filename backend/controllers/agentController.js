import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Agent from "../models/agentModel.js";
import AgentCompany from "../models/agentCompanyModels.js"; // Assuming you have an AgentCompany model

// Controller function for adding agents
const addAgent = asyncHandler(async (req, res) => {
  const { name, email, nid, address, number, agentAvatar } = req.body;
  // const agentCompanyName = req.user.name;

  // Check if the requesting user is an agent company
  if (req.user.role !== "agentCompany") {
    res.status(401);
    throw new Error("Not authorized to add agents");
  }

  const agent = await Agent.create({
    name,
    agentCompany: req.user._id,
    email,
    nid,
    number,
    address,
    agentAvatar,
  });

  if (agent) {
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

  const agents = await Agent.find({ agentCompanyName: req.user._id }).populate(
    "agentCompanyName",
    "name"
  );
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
