import { Invoice } from '../models/Invoice.js';
import { InvoiceItem } from '../models/InvoiceItem.js';

export interface InvoiceItemData {
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  client_id?: string;
  invoice_number: string;
  status?: string;
  subtotal: number;
  tax: number;
  total: number;
  due_date?: string;
  items?: InvoiceItemData[];
}

export class InvoiceService {
  static async createInvoice(organizationId: string, data: InvoiceData) {
    const invoice = new Invoice();
    invoice.setAttribute('organization_id', organizationId);
    invoice.setAttribute('client_id', data.client_id || null);
    invoice.setAttribute('invoice_number', data.invoice_number);
    invoice.setAttribute('status', data.status || 'Draft');
    invoice.setAttribute('subtotal', data.subtotal);
    invoice.setAttribute('tax', data.tax);
    invoice.setAttribute('total', data.total);
    if (data.due_date) invoice.setAttribute('due_date', data.due_date);
    
    await invoice.save();

    if (data.items && data.items.length > 0) {
      for (const itemData of data.items) {
        const item = new InvoiceItem();
        item.setAttribute('invoice_id', invoice.getAttribute('id'));
        item.setAttribute('description', itemData.description);
        item.setAttribute('quantity', itemData.quantity);
        item.setAttribute('unit_price', itemData.price);
        item.setAttribute('amount', Number(itemData.quantity) * Number(itemData.price));
        await item.save();
      }
    }

    return invoice;
  }

  static async getInvoicesByOrganization(organizationId: string) {
    return await Invoice.query()
      .where('organization_id', organizationId)
      .with('client')
      .with('items')
      .orderBy('created_at', 'desc')
      .get();
  }

  static async getInvoiceById(organizationId: string, invoiceId: string) {
    return await Invoice.query()
      .where('organization_id', organizationId)
      .where('id', invoiceId)
      .with('client')
      .with('items')
      .first();
  }

  static async updateInvoiceStatus(organizationId: string, invoiceId: string, status: string) {
    const invoice = await this.getInvoiceById(organizationId, invoiceId);
    if (!invoice) throw new Error('Invoice not found');
    
    invoice.setAttribute('status', status);
    await invoice.save();
    return invoice;
  }

  static async deleteInvoice(organizationId: string, invoiceId: string) {
    const invoice = await this.getInvoiceById(organizationId, invoiceId);
    if (!invoice) throw new Error('Invoice not found');
    await invoice.delete();
    return true;
  }
}
