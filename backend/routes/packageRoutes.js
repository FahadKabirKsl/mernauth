import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addPackage, getAllPackages } from '../controllers/packageController.js';
const router = express.Router();
// Route for adding packages
router.post('/add-package', protect, addPackage);
// Route for viewing all packages
router.get('/list-packages', protect, getAllPackages);

export default router;
