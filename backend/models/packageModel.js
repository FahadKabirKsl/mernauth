import mongoose from 'mongoose';
const packageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  validity_in_days: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ['moneyLendingCompany', 'moneyLendingIndividual', 'agentCompany'],
    default: 'moneyLendingIndividual', // default role can be set here
    required: true,
  },
});

const Package = mongoose.model('Package', packageSchema);

export default Package;
