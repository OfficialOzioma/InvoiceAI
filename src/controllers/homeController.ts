import { Request, Response } from 'express';

export const getHome = (req: Request, res: Response) => {
  res.render('pages/home', {
    title: 'Precision Invoicing | InvoiceAI',
    user: (req as any).user || null
  });
};

export const getAbout = (req: Request, res: Response) => {
  res.render('pages/about', {
    title: 'About | InvoiceAI',
    user: (req as any).user || null
  });
};

export const getContact = (req: Request, res: Response) => {
  res.render('pages/contact', {
    title: 'Contact Us | InvoiceAI',
    user: (req as any).user || null
  });
};

export const getPrivacy = (req: Request, res: Response) => {
  res.render('pages/privacy', {
    title: 'Privacy Policy | InvoiceAI',
    user: (req as any).user || null
  });
};
