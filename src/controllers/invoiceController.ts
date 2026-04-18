import { Request, Response } from 'express';
import { adminDb } from '../lib/firebaseAdmin.js';
import { generateInvoiceDraft } from '../services/geminiService.js';

export const getInvoices = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.redirect('/login');

  try {
    const userDoc = await adminDb.collection('users').doc(user.uid).get();
    const activeWId = userDoc.data()?.activeWorkspace;

    let invoices: any[] = [];
    if (activeWId) {
      const snap = await adminDb.collection('workspaces').doc(activeWId).collection('invoices').orderBy('createdAt', 'desc').get();
      invoices = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

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
