// AgentCompany Model (agentCompanyModel.js)
import mongoose from "mongoose";

const agentCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: [
      "admin",
      "moneyLendingCompany",
      "moneyLendingIndividual",
      "agentCompany",
    ],
    default: "admin", // default role can be set here
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String, // You may want to store a path to the image or use a specific data type based on your application requirements
  },
  incident: {
    type: String,
    // required: true,
  },
  isGood: {
    type: Boolean,
    default: true,
  },
});

const AgentCompany = mongoose.model("AgentCompany", agentCompanySchema);

export default AgentCompany;
