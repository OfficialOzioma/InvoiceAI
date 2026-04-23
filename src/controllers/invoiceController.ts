import { Request, Response } from 'express';
import { generateInvoiceDraft, generateInsights } from '../services/geminiService.js';
import { InvoiceModel } from '../models/Invoice.js';
import { OrganizationModel } from '../models/Organization.js';

export let INVOICES_DB = [
  { 
    id: 'INV-001', invoiceNumber: 'INV-2026-001', clientName: 'Globex Corp', email: 'billing@globex.com', 
    total: '1,450.00', subtotal: '1,350.00', tax: '100.00', status: 'Paid', 
    createdAt: new Date('2026-04-10'), dueDate: new Date('2026-04-24'),
    notes: 'Thank you for your business.', terms: 'Net 14',
    lineItems: [
        { description: 'Consulting Services', quantity: 10, price: '100.00', amount: '1,000.00' },
        { description: 'Server Setup', quantity: 1, price: '350.00', amount: '350.00' }
    ]
  },
  { 
    id: 'INV-002', invoiceNumber: 'INV-2026-002', clientName: 'Initech', email: 'accounts@initech.com', 
    total: '3,200.00', subtotal: '3,200.00', tax: '0.00', status: 'Pending', 
    createdAt: new Date('2026-04-15'), dueDate: new Date('2026-05-15'),
    notes: 'Please remit payment within 30 days.', terms: 'Net 30',
    lineItems: [
        { description: 'Web Application Development', quantity: 1, price: '3,200.00', amount: '3,200.00' }
    ]
  },
  { 
    id: 'INV-003', invoiceNumber: 'INV-2026-003', clientName: 'Umbrella Corp', email: 'finance@umbrellacorp.com', 
    total: '850.00', subtotal: '800.00', tax: '50.00', status: 'Overdue', 
    createdAt: new Date('2026-03-01'), dueDate: new Date('2026-03-15'),
    notes: 'Late fee of 5% applies after due date.', terms: 'Net 14',
    lineItems: [
        { description: 'Security Audit', quantity: 1, price: '800.00', amount: '800.00' }
    ]
  },
  { 
    id: 'INV-004', invoiceNumber: 'INV-2026-004', clientName: 'Stark Industries', email: 'stark@starkindustries.com', 
    total: '12,500.00', subtotal: '12,500.00', tax: '0.00', status: 'Paid', 
    createdAt: new Date('2026-04-05'), dueDate: new Date('2026-05-05'),
    notes: 'Project Titan Phase 1.', terms: 'Net 30',
    lineItems: [
        { description: 'Arc Reactor Implementation', quantity: 1, price: '12,500.00', amount: '12,500.00' }
    ]
  },
  { 
    id: 'INV-005', invoiceNumber: 'INV-2026-005', clientName: 'Wayne Enterprises', email: 'ap@wayne.com', 
    total: '4,500.00', subtotal: '4,000.00', tax: '500.00', status: 'Draft', 
    createdAt: new Date('2026-04-18'), dueDate: new Date('2026-05-18'),
    notes: 'R&D Consultation.', terms: 'Net 30',
    lineItems: [
        { description: 'Tactical Gear Design', quantity: 20, price: '200.00', amount: '4,000.00' }
    ]
  }
];

export const getInvoices = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.redirect('/login');

  try {
    let invoices = [];
    const isDatabaseReady = !!process.env.DATABASE_URL;
    let organization = null;
    
    if (isDatabaseReady) {
      organization = await OrganizationModel.getPrimaryForUser(user.id || 'mock-user-id');
      
      if (organization) {
        const liveInvoices = await InvoiceModel.getAllByOrganizationId(organization.id);
        if (liveInvoices.length > 0) {
          invoices = liveInvoices.map((inv: any) => ({
            ...inv,
            clientName: inv.client?.name || 'Unknown Client',
            total: inv.total.toString(),
            subtotal: inv.subtotal.toString(),
            tax: inv.tax.toString()
          })) as any;
        } else {
          invoices = INVOICES_DB;
        }
      } else {
        invoices = INVOICES_DB;
      }
    } else {
      invoices = INVOICES_DB;
    }
    
    // Group invoices for Kanban View Server-Side
    const kanban = {
      Draft: invoices.filter((i: any) => i.status === 'Draft'),
      Pending: invoices.filter((i: any) => i.status === 'Pending'),
      Overdue: invoices.filter((i: any) => i.status === 'Overdue'),
      Paid: invoices.filter((i: any) => i.status === 'Paid')
    };

    res.render('pages/invoices', { title: 'Ledger | InvoiceAI', layout: 'dashboard-layout', invoices, kanban, organization });
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
  // Creating a new invoice, send a null invoice object to signal it's "new"
  const templateId = req.query.template as string || 'minimal.html';
  res.render('pages/invoiceBuilder', { title: 'Builder | InvoiceAI', layout: 'dashboard-layout', editInvoice: null, templateId });
};

export const getAiAssistant = (req: Request, res: Response) => {
  const templateId = req.query.template as string || 'minimal.html';
  const geminiApiKey = process.env.GEMINI_API_KEY || '';
  
  if (!geminiApiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not set in environment variables.");
  }

  res.render('pages/ai-assistant', { 
    title: 'AI Assistant | InvoiceAI', 
    layout: 'dashboard-layout', 
    templateId,
    geminiApiKey
  });
};

export const getEditBuilder = (req: Request, res: Response) => {
  const invoice = INVOICES_DB.find(i => i.id === req.params.id);
  if (!invoice) return res.status(404).send('Not Found');
  res.render('pages/invoiceBuilder', { title: 'Edit Invoice | InvoiceAI', layout: 'dashboard-layout', editInvoice: invoice });
};

export const getPublicInvoice = (req: Request, res: Response) => {
  const invoice = INVOICES_DB.find(i => i.id === req.params.id);
  if (!invoice) return res.status(404).send('Not Found');
  res.render('pages/public-invoice', { title: `Invoice ${invoice.invoiceNumber}`, layout: false, invoice });
};

export const createAiDraft = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    try {
        const draft = await generateInvoiceDraft(prompt, "Workspace User");
        res.json(draft);
    } catch (error: any) {
        console.error("Controller AI Error:", error);
        res.status(error.status || 500).json({ 
            error: error.message || "AI processing failed",
            details: error.error || null
        });
    }
};

export const getAiInsights = async (req: Request, res: Response) => {
    try {
        const insights = await generateInsights(INVOICES_DB);
        res.json(insights);
    } catch (error: any) {
        console.error("Controller Insights Error:", error);
        res.status(500).json({ error: error.message || "Insights generation failed" });
    }
};

