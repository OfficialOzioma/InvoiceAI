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

  res.render('pages/onboarding', {
    title: `${titles[step - 1]} | Onboarding`,
    step: step,
    totalSteps: 5,
    stepTitle: titles[step - 1]
  });
};

export const postOnboardingStep = async (req: Request, res: Response) => {
  const step = parseInt(req.params.step);
  const data = req.body;
  
  console.log(`Onboarding Step ${step} Data:`, data);

  // In a real app, you'd update Firestore:
  // await updateDoc(doc(db, 'users', userId), { currentOnboardingStep: step + 1 });
  // If step 1, create business doc.
  // If step 2, update logo/colors.
  // If step 5, finish and mark onboardingStatus = 'completed'.

  if (step < 5) {
    res.redirect(`/onboarding/step/${step + 1}`);
  } else {
    // Finish onboarding
    res.redirect('/dashboard');
  }
};
