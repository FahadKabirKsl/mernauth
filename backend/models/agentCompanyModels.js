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
  number: {
    type: Number,
    required: false, 
    unique: true,
  },
  
  cid: {
    type: Number,
    required: false, 
    unique: true,
  },
  avatar: {
    type: String, 
  },
  incident: {
    type: String,
    // required: true,
  },
  isGood: {
    type: Boolean,
    default: true,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});

const AgentCompany = mongoose.model("AgentCompany", agentCompanySchema);

export default AgentCompany;
