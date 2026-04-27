import { Router } from 'express';
import { getOnboardingStep, postOnboardingStep } from '../controllers/onboardingController.js';
import { onboardingValidation } from '../middleware/validation.js';

const router = Router();

// Step 1 validation
router.get('/onboarding/step/:step', getOnboardingStep);
router.post('/onboarding/step/1', onboardingValidation, postOnboardingStep);
router.post('/onboarding/step/:step', postOnboardingStep);

export default router;
