import { Organization } from '../models/Organization.js';
import { OrganizationUser } from '../models/OrganizationUser.js';
import { User } from '../models/User.js';

export class OrganizationService {
  static async createOrganization(userId: string, name: string) {
    const org = new Organization();
    org.setAttribute('name', name);
    await org.save();

    const orgUser = new OrganizationUser();
    orgUser.setAttribute('organization_id', org.getAttribute('id'));
    orgUser.setAttribute('user_id', userId);
    orgUser.setAttribute('role', 'owner');
    await orgUser.save();

    return org;
  }

  static async getOrganizationsForUser(userId: string) {
    const user = await User.query().where('id', userId).first();
    if (!user) return [];
    
    return await user.organizations().get();
  }

  static async inviteStaff(organizationId: string, email: string, role: string = 'member') {
    // Check if user already exists
    let user = await User.query().where('email', email).first();
    
    // If not, we might want to create a placeholder or wait for them to join
    // For now, let's assume they must exist or we create a skeleton
    if (!user) {
      user = new User();
      user.setAttribute('email', email);
      // Random placeholder password for invited users who haven't set one
      user.setAttribute('password', 'invited_placeholder'); 
      await user.save();
    }

    const orgUser = new OrganizationUser();
    orgUser.setAttribute('organization_id', organizationId);
    orgUser.setAttribute('user_id', user.getAttribute('id'));
    orgUser.setAttribute('role', role);
    await orgUser.save();

    return orgUser;
  }

  static async getStaff(organizationId: string) {
    const org = await Organization.query().where('id', organizationId).first();
    if (!org) return [];
    
    return await org.users().get();
  }
}
