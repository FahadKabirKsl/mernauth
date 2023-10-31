import express from "express";
const router = express.Router();
import { protect, checkUserRole } from "../middleware/authMiddleware.js";
import {
  getAllAgents,
  getAllAgentCompanies,
  banAgent,
  banAgentCompany,
  getAllMoneyLendingEntities,
  getAllBanned,
} from "../controllers/adminController.js";

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
router.get(
  "/moneyLendingEntities",
  protect,
  checkUserRole(["admin"]),
  getAllMoneyLendingEntities
);

router.get("/bannedEntities", protect, checkUserRole(["admin"]), getAllBanned);

export default router;
