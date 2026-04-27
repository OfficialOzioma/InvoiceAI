import { Router } from 'express';
import { getOnboardingStep, postOnboardingStep } from '../controllers/onboardingController.js';
import { onboardingStep1Validation, onboardingStep2Validation } from '../middleware/validation.js';

const router = Router();

// Redirect /onboarding to /onboarding/step/1
router.get('/', (req, res) => res.redirect('/onboarding/step/1'));

router.get('/step/:step', getOnboardingStep);
router.post('/step/:step', postOnboardingStep);

export default router;
