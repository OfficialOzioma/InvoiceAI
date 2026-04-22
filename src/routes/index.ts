import { Router } from 'express';
import homeRoutes from './home.js';
import dashboardRoutes from './dashboard.js';
import invoiceRoutes from './invoices.js';
import authRoutes from './auth.js';
import onboardingRoutes from './onboarding.js';
import clientsRoutes from './clients.js';
import paymentsRoutes from './payments.js';
import templatesRoutes from './templates.js';
import settingsRoutes from './settings.js';
import profileRoutes from './profile.js';
import subscriptionRoutes from './subscription.js';

const router = Router();

router.use('/', homeRoutes);
router.use('/', authRoutes);
router.use('/', onboardingRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/clients', clientsRoutes);
router.use('/payments', paymentsRoutes);
router.use('/templates', templatesRoutes);
router.use('/settings', settingsRoutes);
router.use('/profile', profileRoutes);
router.use('/subscription', subscriptionRoutes);

export default router;
