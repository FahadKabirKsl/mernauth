import express from "express";
import dontenv from "dotenv";
import multer from "multer";
dontenv.config();
import cookieParser from "cookie-parser";
// error middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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
