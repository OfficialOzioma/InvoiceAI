import { sutando, Model } from 'sutando';
import { Organization } from './Organization.js';
import { User } from './User.js';

export class OrganizationUser extends Model {
  incrementing = false;
  keyType = 'string';
  table = 'organization_users';

  organization() {
    return this.belongsTo(Organization, 'organization_id');
  }

  user() {
    return this.belongsTo(User, 'user_id');
  }
}
