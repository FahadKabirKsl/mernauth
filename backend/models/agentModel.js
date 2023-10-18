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
  },
  nid: {
    type: Number,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
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
    type: String, // You may want to store a path to the image or use a specific data type based on your application requirements
    // required: true,
  },
  isGood: {
    type: Boolean,
    default: true,
  },
});

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
