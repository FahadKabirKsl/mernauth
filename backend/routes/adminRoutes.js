import express from "express";
const router = express.Router();
import { protect, checkUserRole } from "../middleware/authMiddleware.js";
import {
  getAllAgents,
  getAllAgentCompanies,
  banAgent,
  banAgentCompany,
} from "../controllers/adminController.js"; // Assuming you have an adminController with the necessary functions

// Admin routes
router.get("/agents", protect, checkUserRole(["admin"]), getAllAgents);
router.get(
  "/agentCompanies",
  protect,
  checkUserRole(["admin"]),
  getAllAgentCompanies
);
router.put("/agents/:id/ban", protect, checkUserRole(["admin"]), banAgent);
router.put(
  "/agentCompanies/:id/ban",
  protect,
  checkUserRole(["admin"]),
  banAgentCompany
);

export default router;
