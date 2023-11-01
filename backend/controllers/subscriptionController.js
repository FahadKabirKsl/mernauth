import asyncHandler from 'express-async-handler';
import Subscription from '../models/subscriptionModel.js';

const addSubscription = asyncHandler(async (req, res) => {
  const { userId, packageId, startDate, endDate, status } = req.body;
  const newSubscription = await Subscription.create({
    userId,
    packageId,
    startDate,
    endDate,
    status,
  });

  if (newSubscription) {
    res.status(201).json(newSubscription);
  } else {
    res.status(400);
    throw new Error('Invalid subscription data');
  }
});

const getAllSubscriptions = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to view subscriptions');
  }

  const allSubscriptions = await Subscription.find({});
  res.json(allSubscriptions);
});

export { addSubscription, getAllSubscriptions };
