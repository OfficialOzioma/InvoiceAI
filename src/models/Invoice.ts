import { sutando, Model } from 'sutando';
import { Organization } from './Organization.js';
import { Client } from './Client.js';

export class Invoice extends Model {
  incrementing = false;
  keyType = 'string';
  table = 'invoices';

  organization() {
    return this.belongsTo(Organization, 'organization_id');
  }

  client() {
    return this.belongsTo(Client, 'client_id');
  }
}
