import { Request, Response } from 'express';

const MOCK_INVOICES = [
  { id: 'INV-001', invoiceNumber: 'INV-2026-001', clientName: 'Globex Corp', total: '1,450.00', status: 'Paid', createdAt: new Date() },
  { id: 'INV-002', invoiceNumber: 'INV-2026-002', clientName: 'Initech', total: '3,200.00', status: 'Pending', createdAt: new Date() },
  { id: 'INV-003', invoiceNumber: 'INV-2026-003', clientName: 'Umbrella Corp', total: '850.00', status: 'Overdue', createdAt: new Date() }
];

export const getDashboard = async (req: Request, res: Response) => {
  const user = (req as any).user;
  
  if (!user) {
    return res.redirect('/login');
  }

  try {
    const activeWorkspaceId = 'mock-workspace-id';
    const invoices = MOCK_INVOICES;

    res.render('pages/dashboard', {
      title: 'Dashboard | InvoiceAI',
      layout: 'dashboard-layout',
      user,
      invoices,
      activeWorkspace: activeWorkspaceId
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading dashboard");
  }
};
