import { Request, Response } from 'express';
import { generateInvoiceDraft, generateInsights } from '../services/geminiService.js';
import { InvoiceService } from '../services/invoiceService.js';
import { OrganizationService } from '../services/organizationService.js';
import { ClientService } from '../services/clientService.js';

export const getInvoices = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.redirect('/login');

  try {
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0]; // For now, use the first one
    
    if (!organization) {
      return res.redirect('/onboarding');
    }

    const orgId = organization.getAttribute('id');
    const rawInvoices = await InvoiceService.getInvoicesByOrganization(orgId);
    
    // Map to camelCase for the frontend template
    const invoices = rawInvoices.map(inv => {
      const client = inv.getAttribute('client');
      return {
        id: inv.getAttribute('id'),
        invoiceNumber: inv.getAttribute('invoice_number'),
        clientName: client ? client.getAttribute('name') : 'No Client',
        email: client ? client.getAttribute('email') : '',
        total: inv.getAttribute('total'),
        subtotal: inv.getAttribute('subtotal'),
        tax: inv.getAttribute('tax'),
        status: inv.getAttribute('status'),
        createdAt: inv.getAttribute('created_at'),
        dueDate: inv.getAttribute('due_date'),
        lineItems: [] // Will add line items later
      };
    });
    
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

export const getInvoiceDetail = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const orgs = await OrganizationService.getOrganizationsForUser(user.id);
  const organization = orgs[0];

  if (!organization) return res.redirect('/onboarding');

  const invoiceModel = await InvoiceService.getInvoiceById(organization.getAttribute('id'), req.params.id);
  if (!invoiceModel) return res.status(404).send('Not Found');

  const client = invoiceModel.getAttribute('client');
  const invoice = {
    id: invoiceModel.getAttribute('id'),
    invoiceNumber: invoiceModel.getAttribute('invoice_number'),
    clientName: client ? client.getAttribute('name') : 'No Client',
    email: client ? client.getAttribute('email') : '',
    total: invoiceModel.getAttribute('total'),
    subtotal: invoiceModel.getAttribute('subtotal'),
    tax: invoiceModel.getAttribute('tax'),
    status: invoiceModel.getAttribute('status'),
    createdAt: invoiceModel.getAttribute('created_at'),
    dueDate: invoiceModel.getAttribute('due_date'),
    lineItems: []
  };

  res.render('pages/invoice-detail', { title: `Invoice ${invoice.invoiceNumber}`, layout: 'dashboard-layout', invoice });
};

export const updateInvoiceStatus = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0];
    if (!organization) return res.status(403).json({ error: 'No organization' });

    const invoice = await InvoiceService.updateInvoiceStatus(organization.getAttribute('id'), id, status);
    res.json({ success: true, invoice });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;
  
  try {
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0];
    if (!organization) return res.status(403).json({ error: 'No organization' });

    await InvoiceService.deleteInvoice(organization.getAttribute('id'), id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const getBuilder = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const orgs = await OrganizationService.getOrganizationsForUser(user.id);
  const organization = orgs[0];
  if (!organization) return res.redirect('/onboarding');

  const clients = await ClientService.getClientsByOrganization(organization.getAttribute('id'));

  const templateId = req.query.template as string || 'minimal.html';
  res.render('pages/invoiceBuilder', { 
    title: 'Builder | InvoiceAI', 
    layout: 'dashboard-layout', 
    editInvoice: null, 
    templateId,
    clients: clients.map(c => ({ id: c.getAttribute('id'), name: c.getAttribute('name') }))
  });
};

export const getAiAssistant = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const orgs = await OrganizationService.getOrganizationsForUser(user.id);
  const organization = orgs[0];
  const templateId = req.query.template as string || 'minimal.html';
  const geminiApiKey = process.env.GEMINI_API_KEY || '';
  
  if (!geminiApiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not set in environment variables.");
  }

  res.render('pages/ai-assistant', { 
    title: 'AI Assistant | InvoiceAI', 
    layout: 'dashboard-layout', 
    templateId,
    geminiApiKey,
    organization
  });
};

export const getEditBuilder = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const orgs = await OrganizationService.getOrganizationsForUser(user.id);
  const organization = orgs[0];
  if (!organization) return res.redirect('/onboarding');

  const invoice = await InvoiceService.getInvoiceById(organization.getAttribute('id'), req.params.id);
  if (!invoice) return res.status(404).send('Not Found');
  res.render('pages/invoiceBuilder', { title: 'Edit Invoice | InvoiceAI', layout: 'dashboard-layout', editInvoice: invoice });
};

export const getPublicInvoice = async (req: Request, res: Response) => {
  // Public invoice doesn't need auth, but we should find it by ID globally
  // We'll use a direct query for public view
  const { id } = req.params;
  const { Invoice } = await import('../models/Invoice.js');
  const invoice = await Invoice.query().where('id', id).first();
  
  if (!invoice) return res.status(404).send('Not Found');
  res.render('pages/public-invoice', { title: `Invoice ${invoice.getAttribute('invoice_number')}`, layout: false, invoice });
};

export const createInvoice = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { invoiceNumber, clientId, issueDate, dueDate, items, notes } = req.body;
  
  try {
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0];
    if (!organization) return res.status(403).json({ error: 'No organization' });

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.quantity) * Number(item.price)), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const invoice = await InvoiceService.createInvoice(organization.getAttribute('id'), {
      invoice_number: invoiceNumber,
      client_id: clientId,
      subtotal,
      tax,
      total,
      due_date: dueDate,
      status: 'Pending',
      items: items // InvoiceService now handles this
    });

    res.json({ success: true, invoice });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
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
        const user = (req as any).user;
        const orgs = await OrganizationService.getOrganizationsForUser(user.id);
        const organization = orgs[0];
        if (!organization) return res.status(403).json({ error: 'No organization' });

        const invoices = await InvoiceService.getInvoicesByOrganization(organization.getAttribute('id'));
        const insights = await generateInsights((invoices as any).all().map((i: any) => i.toJSON()));
        res.json(insights);
    } catch (error: any) {
        console.error("Controller Insights Error:", error);
        res.status(500).json({ error: error.message || "Insights generation failed" });
    }
};

