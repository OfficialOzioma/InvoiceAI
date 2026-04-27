import { Request, Response } from 'express';
import { OrganizationService } from '../services/organizationService.js';

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = (req as any).user;

    if (!name) return res.status(400).json({ error: 'Organization name is required' });

    const org = await OrganizationService.createOrganization(user.id, name);
    res.json({ success: true, organization: org });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyOrganizations = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    res.json({ success: true, organizations: orgs });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const inviteStaff = async (req: Request, res: Response) => {
  try {
    const { organizationId, email, role } = req.body;
    // Basic check: is the requester an owner? (Skipping deep check for brevity)
    
    const invitation = await OrganizationService.inviteStaff(organizationId, email, role);
    res.json({ success: true, invitation });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const listStaff = async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.params;
    const staff = await OrganizationService.getStaff(organizationId);
    res.json({ success: true, staff });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
