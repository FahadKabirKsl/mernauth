import mongoose from "mongoose";

const bannedSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: false, // Make it optional for the agent company
    unique: true,
  },
  nid: {
    type: Number,
    required: false, // Make it optional for the agent company
    unique: true,
  },
  isAgent: {
    type: Boolean,
    required: true,
  },
  isCompany: {
    type: Boolean,
    required: true,
  },
  // Other fields related to the banned entity
});

const Banned = mongoose.model("Banned", bannedSchema);

export default Banned;
