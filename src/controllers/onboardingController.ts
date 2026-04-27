import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

export const getOnboardingStep = (req: Request, res: Response) => {
  const step = parseInt(req.params.step || '1');
  const titles = [
    'Business Information',
    'Branding & Identity',
    'Template Selection',
    'Payment Configuration',
    'Your First Invoice'
  ];

  const onboardingData = (req.session as any).onboardingData || {};

  res.render('pages/onboarding', {
    title: `${titles[step - 1]} | Onboarding`,
    step: step,
    totalSteps: 5,
    stepTitle: titles[step - 1],
    onboardingData: onboardingData,
    error: req.query.error
  });
};

export const postOnboardingStep = async (req: Request, res: Response) => {
  const step = parseInt(req.params.step);
  const data = req.body;
  const user = (req as any).user;
  
  if (!user) return res.redirect('/login');

  if (!(req.session as any).onboardingData) {
    (req.session as any).onboardingData = {};
  }
  
  if (data.items) {
    data.items = Object.values(data.items).filter((item: any) => item.description || item.amount);
  }

  (req.session as any).onboardingData = {
    ...(req.session as any).onboardingData,
    ...data
  };

  if (step === 5) {
      try {
          const finalData = (req.session as any).onboardingData;
          await AuthService.setupOrganization(user.id, finalData.businessName || 'My Business');
          // Clear session data
          (req.session as any).onboardingData = null;
          return res.redirect('/dashboard');
      } catch (err: any) {
          console.error('Final onboarding error:', err);
          return res.redirect(`/onboarding/step/5?error=${encodeURIComponent(err.message)}`);
      }
  }

  req.session.save((err) => {
    if (err) console.error('Session save error:', err);
    res.redirect(`/onboarding/step/${step + 1}`);
  });
};
