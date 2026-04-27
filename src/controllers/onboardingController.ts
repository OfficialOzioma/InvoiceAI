import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { ClientService } from '../services/clientService.js';
import { InvoiceService } from '../services/invoiceService.js';

export const getOnboardingStep = (req: Request, res: Response) => {
  let step = parseInt(req.params.step || '1');
  if (isNaN(step)) step = 1;
  const titles = [
    'Business Information',
    'Branding & Identity',
    'Subscription Plan',
    'Payment Configuration',
    'Your First Invoice'
  ];

  const onboardingData = (req.session as any).onboardingData || {};

  // Force Sequential Access
  if (step > 1 && !onboardingData.businessName) {
      return res.redirect('/onboarding/step/1');
  }

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
  let step = parseInt(req.params.step);
  if (isNaN(step)) step = 1;
  const data = req.body;
  const user = (req as any).user;
  
  if (!user) return res.redirect('/login');

  // Manual Validation for Step 1
  if (step === 1) {
      if (!data.businessName || data.businessName.trim() === '') {
          return res.redirect(`/onboarding/step/1?error=${encodeURIComponent('Business name is required')}`);
      }
      if (!data.businessEmail || !data.businessEmail.includes('@')) {
          return res.redirect(`/onboarding/step/1?error=${encodeURIComponent('A valid business email is required')}`);
      }
  }

  if (!(req.session as any).onboardingData) {
    (req.session as any).onboardingData = {};
  }
  
  if (data.items) {
    data.items = Object.values(data.items).filter((item: any) => (item as any).description || (item as any).amount);
  }

  // Handle Logo Upload for Step 2
  if (step === 2 && req.file) {
      const base64 = req.file.buffer.toString('base64');
      data.logoUrl = `data:${req.file.mimetype};base64,${base64}`;
  }

  (req.session as any).onboardingData = {
    ...(req.session as any).onboardingData,
    ...data
  };

  if (step === 5) {
      try {
          const finalData = (req.session as any).onboardingData;
          const organization = await AuthService.setupOrganization(user.id, finalData);
          const orgId = organization.getAttribute('id');

          // If they provided a client during onboarding, create it
          if (finalData.clientName) {
            const client = await ClientService.createClient(orgId, {
                name: finalData.clientName,
                email: finalData.clientEmail || '',
                address: finalData.clientAddress || ''
            });

            // Create first invoice
            if (finalData.items && finalData.items.length > 0) {
                const subtotal = finalData.items.reduce((sum: number, item: any) => sum + (parseFloat(item.amount) || 0), 0);
                await InvoiceService.createInvoice(orgId, {
                    client_id: client.getAttribute('id'),
                    invoice_number: 'INV-001',
                    subtotal,
                    tax: subtotal * 0.1,
                    total: subtotal * 1.1,
                    status: 'Pending',
                    items: finalData.items.map((item: any) => ({
                        description: item.description,
                        quantity: 1,
                        price: parseFloat(item.amount) || 0
                    }))
                });
            }
          }

          // Clear session data
          (req.session as any).onboardingData = null;
          return res.redirect('/invoices');
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
