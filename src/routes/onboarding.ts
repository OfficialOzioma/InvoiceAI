import { Router } from 'express';
import { getOnboardingStep, postOnboardingStep } from '../controllers/onboardingController.js';

const router = Router();

// Middleware to ensure user is authenticated and hasn't finished onboarding could be added here
router.get('/onboarding/step/:step', getOnboardingStep);
router.post('/onboarding/step/:step', postOnboardingStep);

export default router;
