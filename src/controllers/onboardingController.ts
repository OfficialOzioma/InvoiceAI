import { Request, Response } from 'express';

export const getOnboardingStep = (req: Request, res: Response) => {
  const step = parseInt(req.params.step || '1');
  const titles = [
    'Business Information',
    'Branding & Identity',
    'Template Selection',
    'Payment Configuration',
    'Your First Invoice'
  ];

  // Retrieve stored data from session
  const onboardingData = (req.session as any).onboardingData || {};

  res.render('pages/onboarding', {
    title: `${titles[step - 1]} | Onboarding`,
    step: step,
    totalSteps: 5,
    stepTitle: titles[step - 1],
    onboardingData: onboardingData
  });
};

export const postOnboardingStep = async (req: Request, res: Response) => {
  const step = parseInt(req.params.step);
  const data = req.body;
  
  if (!(req.session as any).onboardingData) {
    (req.session as any).onboardingData = {};
  }
  
  // Clean up numerical items if they exist to avoid object-like array structures
  if (data.items) {
    data.items = Object.values(data.items).filter((item: any) => item.description || item.amount);
  }

  // Merge new data
  (req.session as any).onboardingData = {
    ...(req.session as any).onboardingData,
    ...data
  };

  req.session.save((err) => {
    if (err) console.error('Session save error:', err);
    console.log(`Onboarding Step ${step} Persisted:`, (req.session as any).onboardingData);
    
    if (step < 5) {
      res.redirect(`/onboarding/step/${step + 1}`);
    } else {
      res.redirect('/dashboard');
    }
  });
};
