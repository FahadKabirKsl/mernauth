import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addSubscription, getAllSubscriptions } from '../controllers/subscriptionController.js';
const router = express.Router();
// Route for adding subscriptions
router.post('/add-subscription', protect, addSubscription);
// Route for viewing all subscriptions
router.get('/list-subscriptions', protect, getAllSubscriptions);

export default router;
