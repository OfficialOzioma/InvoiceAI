import { Request, Response } from 'express';
import { InvoiceModel } from '../models/Invoice.js';
import { BusinessSettingsModel } from '../models/BusinessSettings.js';

const MOCK_INVOICES = [
  { id: 'INV-001', invoiceNumber: 'INV-2026-001', clientName: 'Globex Corp', total: '1,450.00', status: 'Paid', createdAt: new Date() },
  { id: 'INV-002', invoiceNumber: 'INV-2026-002', clientName: 'Initech', total: '3,200.00', status: 'Pending', createdAt: new Date() },
  { id: 'INV-003', invoiceNumber: 'INV-2026-003', clientName: 'Umbrella Corp', total: '850.00', status: 'Overdue', createdAt: new Date() },
  { id: 'INV-004', invoiceNumber: 'INV-2026-004', clientName: 'Stark Industries', total: '12,500.00', status: 'Paid', createdAt: new Date() }
];

const MOCK_STATS = {
  totalRevenue: '45,231.00',
  revenueTrend: '+12.5%',
  revenueIsUp: true,
  outstanding: '4,050.00',
  outstandingTrend: '-2.4%',
  outstandingIsUp: false,
  paidInvoices: 124,
  paidTrend: '+8.1%',
  paidIsUp: true,
  overdueInvoices: 3,
  overdueTrend: '+1',
  overdueIsUp: true // technically bad, but means increase
};

export const getDashboard = async (req: Request, res: Response) => {
  const user = (req as any).user;
  
  if (!user) {
    return res.redirect('/login');
  }

  try {
    const activeWorkspaceId = 'mock-workspace-id';
    let invoices = MOCK_INVOICES;
    let stats = MOCK_STATS;

    const isDatabaseReady = !!process.env.DATABASE_URL;
    if (isDatabaseReady) {
      const liveInvoices = await InvoiceModel.getAllByUserId(user.id || 'mock-id');
      if (liveInvoices.length > 0) {
        invoices = liveInvoices.slice(0, 5).map((inv: any) => ({
          id: inv.id,
          invoiceNumber: inv.invoiceNumber,
          clientName: inv.client?.name || 'Unknown Client',
          total: inv.total.toString(),
          status: inv.status,
          createdAt: inv.createdAt
        })) as any;
        
        // Calculate basic stats from live data
        const totalRev = liveInvoices
            .filter((i: any) => i.status === 'Paid')
            .reduce((sum: number, i: any) => sum + parseFloat(i.total || 0), 0);
        
        const outstanding = liveInvoices
            .filter((i: any) => i.status === 'Pending')
            .reduce((sum: number, i: any) => sum + parseFloat(i.total || 0), 0);

        stats = {
            ...MOCK_STATS,
            totalRevenue: totalRev.toLocaleString('en-US', { minimumFractionDigits: 2 }),
            outstanding: outstanding.toLocaleString('en-US', { minimumFractionDigits: 2 }),
            paidInvoices: liveInvoices.filter((i: any) => i.status === 'Paid').length,
            overdueInvoices: liveInvoices.filter((i: any) => i.status === 'Overdue').length,
        };
      }
    }

    res.render('pages/dashboard', {
      title: 'Dashboard | InvoiceAI',
      layout: 'dashboard-layout',
      user,
      invoices,
      stats,
      activeWorkspace: activeWorkspaceId
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading dashboard");
  }
};
