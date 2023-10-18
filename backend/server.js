import express from "express";
import dontenv from "dotenv";
dontenv.config();
import cookieParser from "cookie-parser";
// error middleware
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
