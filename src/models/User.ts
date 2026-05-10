import { sutando, Model, compose, HasUniqueIds } from 'sutando';
import { Organization } from './Organization.js';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'node:crypto';

const Base=compose(Model, HasUniqueIds) as any;

export class User extends Base {
  incrementing=false;
  keyType='string';

  newUniqueId() {
    return crypto.randomUUID();
  }

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

export default User;