import { Request, Response } from 'express';
import { generateInvoiceDraft } from '../services/geminiService.js';

export let INVOICES_DB = [
  { id: 'INV-001', invoiceNumber: 'INV-2026-001', clientName: 'Globex Corp', total: '1,450.00', status: 'Paid', createdAt: new Date() },
  { id: 'INV-002', invoiceNumber: 'INV-2026-002', clientName: 'Initech', total: '3,200.00', status: 'Pending', createdAt: new Date() },
  { id: 'INV-003', invoiceNumber: 'INV-2026-003', clientName: 'Umbrella Corp', total: '850.00', status: 'Overdue', createdAt: new Date() },
  { id: 'INV-004', invoiceNumber: 'INV-2026-004', clientName: 'Stark Industries', total: '12,500.00', status: 'Paid', createdAt: new Date() },
  { id: 'INV-005', invoiceNumber: 'INV-2026-005', clientName: 'Wayne Enterprises', total: '4,500.00', status: 'Draft', createdAt: new Date() }
];

export const getInvoices = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.redirect('/login');

  try {
    const invoices = INVOICES_DB;
    
    // Group invoices for Kanban View Server-Side
    const kanban = {
      Draft: invoices.filter(i => i.status === 'Draft'),
      Pending: invoices.filter(i => i.status === 'Pending'),
      Overdue: invoices.filter(i => i.status === 'Overdue'),
      Paid: invoices.filter(i => i.status === 'Paid')
    };

    res.render('pages/invoices', { title: 'Ledger | InvoiceAI', layout: 'dashboard-layout', invoices, kanban });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

export const getInvoiceDetail = (req: Request, res: Response) => {
  const invoice = INVOICES_DB.find(i => i.id === req.params.id);
  if (!invoice) return res.status(404).send('Not Found');
  res.render('pages/invoice-detail', { title: `Invoice ${invoice.invoiceNumber}`, layout: 'dashboard-layout', invoice });
};

export const updateInvoiceStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const idx = INVOICES_DB.findIndex(i => i.id === id);
  if (idx !== -1) {
    INVOICES_DB[idx].status = status;
    res.json({ success: true, invoice: INVOICES_DB[idx] });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
};

export const deleteInvoice = (req: Request, res: Response) => {
  const { id } = req.params;
  INVOICES_DB = INVOICES_DB.filter(i => i.id !== id);
  res.json({ success: true });
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

