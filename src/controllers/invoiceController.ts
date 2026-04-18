import { Request, Response } from 'express';
import { generateInvoiceDraft } from '../services/geminiService.js';

const MOCK_INVOICES = [
  { id: 'INV-001', invoiceNumber: 'INV-2026-001', clientName: 'Globex Corp', total: '1,450.00', status: 'Paid', createdAt: new Date() },
  { id: 'INV-002', invoiceNumber: 'INV-2026-002', clientName: 'Initech', total: '3,200.00', status: 'Pending', createdAt: new Date() },
  { id: 'INV-003', invoiceNumber: 'INV-2026-003', clientName: 'Umbrella Corp', total: '850.00', status: 'Overdue', createdAt: new Date() }
];

export const getInvoices = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.redirect('/login');

  try {
    const invoices = MOCK_INVOICES;

    res.render('pages/invoices', { title: 'Ledger | InvoiceAI', layout: 'dashboard-layout', invoices });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

export const getBuilder = (req: Request, res: Response) => {
  res.render('pages/invoiceBuilder', { title: 'Builder | InvoiceAI', layout: 'dashboard-layout' });
};

export const createAiDraft = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    try {
        const draft = await generateInvoiceDraft(prompt, "Workspace User");
        res.json(draft);
    } catch (error) {
        res.status(500).json({ error: "AI failed" });
    }
};
