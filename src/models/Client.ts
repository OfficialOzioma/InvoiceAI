import { sutando, Model } from 'sutando';
import { Organization } from './Organization.js';
import { Invoice } from './Invoice.js';

export class Client extends Model {
  incrementing = false;
  keyType = 'string';
  table = 'clients';

  organization() {
    return this.belongsTo(Organization, 'organization_id');
  }

  invoices() {
    return this.hasMany(Invoice, 'client_id');
  }
}
