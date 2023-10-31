import mongoose from "mongoose";
const agentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agentCompany: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AgentCompany",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nid: {
    type: Number,
    required: true,
    unique: true,
    sparse: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
    sparse: true,
  },
  address: {
    type: String,
    required: true,
  },

  incident: {
    type: String,
    // required: true,
  },
  agentAvatar: {
    type: String,
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

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
