import { Router } from 'express';
import { getOnboardingStep, postOnboardingStep } from '../controllers/onboardingController.js';
import { onboardingStep1Validation, onboardingStep2Validation } from '../middleware/validation.js';

const router = Router();

// Validation per step
router.get('/step/:step', getOnboardingStep);
router.post('/step/1', onboardingStep1Validation, postOnboardingStep);
router.post('/step/2', onboardingStep2Validation, postOnboardingStep);
router.post('/step/:step', postOnboardingStep);

export default router;
