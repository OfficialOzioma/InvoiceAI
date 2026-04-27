import { Router } from 'express';
import { getOnboardingStep, postOnboardingStep } from '../controllers/onboardingController.js';
import { onboardingStep1Validation, onboardingStep2Validation } from '../middleware/validation.js';
import multer from 'multer';

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

const router = Router();

// Redirect /onboarding to /onboarding/step/1
router.get('/', (req, res) => res.redirect('/onboarding/step/1'));

router.get('/step/:step', getOnboardingStep);
router.post('/step/:step', upload.single('logo'), postOnboardingStep);

export default router;
