import asyncHandler from 'express-async-handler';
import Package from '../models/packageModel.js';

const addPackage = asyncHandler(async (req, res) => {
  const { name, validity_in_days, price, role } = req.body;
  if (req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to add packages');
  }
  const existingPackage = await Package.findOne({
    name,
  });

  if (existingPackage) {
    res.status(400);
    throw new Error('Package already exists');
  }
  const newPackage = await Package.create({
    name,
    validity_in_days,
    price,
    role,
  });

  if (newPackage) {
    res.status(201).json(newPackage);
  } else {
    res.status(400);
    throw new Error('Invalid package data');
  }
});
const getAllPackages = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to view packages');
  }

  const allPackages = await Package.find({});
  res.json(allPackages);
});

export { addPackage, getAllPackages };
