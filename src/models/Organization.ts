import { sutando, Model } from 'sutando';
import { User } from './User.js';
import { Invoice } from './Invoice.js';
import { Client } from './Client.js';

export class Organization extends Model {
  incrementing = false;
  keyType = 'string';
  table = 'organizations';

  users() {
    return this.belongsToMany(
      User,
      'organization_users',
      'organization_id',
      'user_id'
    ).withPivot(['role']);
  }

  invoices() {
    return this.hasMany(Invoice, 'organization_id');
  }

  clients() {
    return this.hasMany(Client, 'organization_id');
  }
}
