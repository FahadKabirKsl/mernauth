import express from "express";
import dontenv from "dotenv";
dontenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => res.send("server is ready"));
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));

// POST: localhost:5000/api/users
// POST: localhost:5000/api/users/auth
// POST: localhost:5000/api/users/logout
// GET: localhost:5000/api/users/profile
// PUT: localhost:5000/api/users/profile
// POST: localhost:5000/api/agents/add-agent
// GET: localhost:5000/api/agents/list-agents
// GET: localhost:5000/api/agents/myagents
// GET: localhost:5000/api/agents/agentCompanies
// PUT: localhost:5000/api/agents/reportAgent/:id
// PUT: localhost:5000/api/agents/reportAgentCompany/:id
//GET: localhost:5000/api/admin/agents
//GET: localhost:5000/api/admin/agentCompanies
//PUT: localhost:5000/api/admin/agents/:id/ban
//PUT: localhost:5000/api/admin/agentCompanies/:id/ban
