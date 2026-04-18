import { Request, Response } from 'express';

export const getHome = (req: Request, res: Response) => {
  res.render('pages/home', {
    title: 'Precision Invoicing | InvoiceAI',
    user: (req as any).user || null
  });
};
