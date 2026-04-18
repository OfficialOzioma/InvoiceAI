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
  
  // Persist current step data to session
  if (!(req.session as any).onboardingData) {
    (req.session as any).onboardingData = {};
  }
  
  // Merge new data with existing session data
  (req.session as any).onboardingData = {
    ...(req.session as any).onboardingData,
    ...data
  };

  console.log(`Onboarding Step ${step} Updated Data:`, (req.session as any).onboardingData);

  if (step < 5) {
    res.redirect(`/onboarding/step/${step + 1}`);
  } else {
    // Finish onboarding
    res.redirect('/dashboard');
  }
};
