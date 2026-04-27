import { Router } from 'express';
import homeRoutes from './home.js';
import dashboardRoutes from './dashboard.js';
import invoiceRoutes from './invoices.js';
import authRoutes from './auth.js';
import onboardingRoutes from './onboarding.js';
import organizationRoutes from './organizations.js';
import clientsRoutes from './clients.js';
import paymentsRoutes from './payments.js';
import templatesRoutes from './templates.js';
import settingsRoutes from './settings.js';
import profileRoutes from './profile.js';
import subscriptionRoutes from './subscription.js';
import { requireAuth, requireOrganization } from '../middleware/auth.js';

const router = Router();

router.use('/', homeRoutes);
router.use('/', authRoutes);
router.use('/onboarding', requireAuth, requireOrganization, onboardingRoutes);
router.use('/organizations', requireAuth, requireOrganization, organizationRoutes);
router.use('/dashboard', requireAuth, requireOrganization, dashboardRoutes);
router.use('/invoices', requireAuth, requireOrganization, invoiceRoutes);
router.use('/clients', requireAuth, requireOrganization, clientsRoutes);
router.use('/payments', requireAuth, requireOrganization, paymentsRoutes);
router.use('/templates', requireAuth, requireOrganization, templatesRoutes);
router.use('/settings', requireAuth, requireOrganization, settingsRoutes);
router.use('/profile', requireAuth, requireOrganization, profileRoutes);
router.use('/subscription', requireAuth, requireOrganization, subscriptionRoutes);

export default router;
