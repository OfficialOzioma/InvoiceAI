import { sutando, Model } from 'sutando';
import { Invoice } from './Invoice.js';

export class InvoiceItem extends Model {
  incrementing = false;
  keyType = 'string';
  table = 'invoice_items';

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id');
  }
}
