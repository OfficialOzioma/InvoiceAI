import { Request, Response } from 'express';
import { ClientService } from '../services/clientService.ts';
import { OrganizationService } from '../services/organizationService.ts';

export const getClients = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.redirect('/login');

  try {
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0];
    if (!organization) return res.redirect('/onboarding');

    const clients = await ClientService.getClientsByOrganization(organization.getAttribute('id'));
    
    res.render('pages/clients', { 
      title: 'Clients | InvoiceAI', 
      layout: 'dashboard-layout', 
      user,
      initialClients: clients.map(c => ({
        id: c.getAttribute('id'),
        name: c.getAttribute('name'),
        email: c.getAttribute('email'),
        address: c.getAttribute('address'),
        phone: '', // Not in DB yet, but template expects it
        status: 'Active',
        totalInvoiced: '$0' // Will calculate later
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading clients");
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0];
    if (!organization) return res.status(403).json({ error: 'No organization' });

    const client = await ClientService.createClient(organization.getAttribute('id'), req.body);
    res.json({ success: true, client });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0];
    if (!organization) return res.status(403).json({ error: 'No organization' });

    const client = await ClientService.updateClient(organization.getAttribute('id'), id, req.body);
    res.json({ success: true, client });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    const organization = orgs[0];
    if (!organization) return res.status(403).json({ error: 'No organization' });

    await ClientService.deleteClient(organization.getAttribute('id'), id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
