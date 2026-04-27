import { Request, Response } from 'express';
import { InvoiceService } from '../services/invoiceService.js';
import { OrganizationService } from '../services/organizationService.js';

export const getDashboard = async (req: Request, res: Response) => {
  const user = (req as any).user;
  
  if (!user) {
    return res.redirect('/login');
  }

  try {
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0];
    
    if (!organization) {
      return res.redirect('/onboarding');
    }

    const orgId = organization.getAttribute('id');
    const rawInvoices = await InvoiceService.getInvoicesByOrganization(orgId);

    // Map for frontend
    const invoices = rawInvoices.slice(0, 5).map(inv => {
      const client = inv.getAttribute('client');
      return {
        id: inv.getAttribute('id'),
        invoiceNumber: inv.getAttribute('invoice_number'),
        clientName: client ? client.getAttribute('name') : 'No Client',
        total: inv.getAttribute('total'),
        status: inv.getAttribute('status'),
        createdAt: inv.getAttribute('created_at')
      };
    });

    // Calculate real stats
    const invoicesArray = rawInvoices.all();
    const totalRevenue = invoicesArray
      .filter(i => i.getAttribute('status') === 'Paid')
      .reduce((sum, i) => sum + parseFloat(i.getAttribute('total')), 0);

    const outstanding = invoicesArray
      .filter(i => i.getAttribute('status') === 'Pending')
      .reduce((sum, i) => sum + parseFloat(i.getAttribute('total')), 0);

    const paidCount = invoicesArray.filter(i => i.getAttribute('status') === 'Paid').length;
    const overdueCount = invoicesArray.filter(i => i.getAttribute('status') === 'Overdue').length;

    const stats = {
      totalRevenue: totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 }),
      revenueTrend: '+0%',
      revenueIsUp: true,
      outstanding: outstanding.toLocaleString('en-US', { minimumFractionDigits: 2 }),
      outstandingTrend: '0%',
      outstandingIsUp: false,
      paidInvoices: paidCount,
      paidTrend: '0%',
      paidIsUp: true,
      overdueInvoices: overdueCount,
      overdueTrend: '0%',
      overdueIsUp: overdueCount > 0
    };

    res.render('pages/dashboard', {
      title: 'Dashboard | InvoiceAI',
      layout: 'dashboard-layout',
      user,
      invoices,
      stats,
      activeWorkspace: orgId
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading dashboard");
  }
};
