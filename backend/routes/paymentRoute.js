import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createPaymentIntent } from '../controllers/paymentController.js';
const router = express.Router();
// Route for creating a payment intent
router.post('/create-payment-intent', protect, createPaymentIntent);

export default router;
