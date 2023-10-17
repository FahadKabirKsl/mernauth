import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import {
  addAgent,
  getAllAgents,
  getAllAgentCompanies,
  reportAgent,
  reportAgentCompany,
  getAgentsForCompany,
} from "../controllers/agentController.js";

const router = express.Router();

// Route for adding agents
router.post("/add", protect, addAgent);

// Route for viewing all agents
router.get("/agents", protect, getAllAgents);
// Route for viewing agents for the current agent company
router.get("/myagents", protect, getAgentsForCompany);

// Route for viewing all agent companies
router.get("/agentCompanies", protect, getAllAgentCompanies);

// Route for reporting whether an agent is fraud/good with an incident
router.put("/reportAgent/:id", protect, reportAgent);

// Route for reporting whether an agent company is fraud/good with an incident
router.put("/reportAgentCompany/:id", protect, reportAgentCompany);

export default router;