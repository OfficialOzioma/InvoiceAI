import { sutando, Model } from 'sutando';
import { Organization } from './Organization.js';

export class User extends Model {
  incrementing = false;
  keyType = 'string';
  table = 'users';

  // Define relationships if needed
  organizations() {
    return this.belongsToMany(
      Organization,
      'organization_users',
      'user_id',
      'organization_id'
    ).withPivot(['role']);
  }
}
