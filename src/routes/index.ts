import { Router } from 'express';
import homeRoutes from './home.js';
import dashboardRoutes from './dashboard.js';
import invoiceRoutes from './invoices.js';
import authRoutes from './auth.js';

const router = Router();

router.use('/', homeRoutes);
router.use('/', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/invoices', invoiceRoutes);

export default router;
