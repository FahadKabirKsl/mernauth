import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  addAgent,
  getAllAgents,
  getAllAgentCompanies,
  reportAgent,
  reportAgentCompany,
  getAgentsForCompany,
} from "../controllers/agentController.js";

import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../frontend/public/uploads/"));
  },
  filename: function (req, file, cb) {
    /*Appending extension with original name*/
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Route for adding agents
router.post("/add-agent", protect, upload.single("agentAvatar"), addAgent);

// Route for viewing all agents
router.get("/list-agents", protect, getAllAgents);
// Route for viewing agents for the current agent company
router.get("/myagents", protect, getAgentsForCompany);

// Route for viewing all agent companies
router.get("/agentCompanies", protect, getAllAgentCompanies);

// Route for reporting whether an agent is fraud/good with an incident
router.put("/reportAgent/:id", protect, reportAgent);

// Route for reporting whether an agent company is fraud/good with an incident
router.put("/reportAgentCompany/:id", protect, reportAgentCompany);

export default router;
