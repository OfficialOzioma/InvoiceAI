import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController.js';

const router = Router();

// Middleware should go here
router.get('/', getDashboard);

export default router;
