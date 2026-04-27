import { Client } from '../models/Client.js';

export class ClientService {
  static async createClient(organizationId: string, data: { name: string; email?: string; address?: string }) {
    const client = new Client();
    client.setAttribute('organization_id', organizationId);
    client.setAttribute('name', data.name);
    if (data.email) client.setAttribute('email', data.email);
    if (data.address) client.setAttribute('address', data.address);
    await client.save();
    return client;
  }

  static async getClientsByOrganization(organizationId: string) {
    return await Client.query().where('organization_id', organizationId).orderBy('created_at', 'desc').get();
  }

  static async getClientById(organizationId: string, clientId: string) {
    return await Client.query()
      .where('organization_id', organizationId)
      .where('id', clientId)
      .first();
  }

  static async updateClient(organizationId: string, clientId: string, data: Partial<{ name: string; email: string; address: string }>) {
    const client = await this.getClientById(organizationId, clientId);
    if (!client) throw new Error('Client not found');

    if (data.name) client.setAttribute('name', data.name);
    if (data.email) client.setAttribute('email', data.email);
    if (data.address) client.setAttribute('address', data.address);
    
    await client.save();
    return client;
  }

  static async deleteClient(organizationId: string, clientId: string) {
    const client = await this.getClientById(organizationId, clientId);
    if (!client) throw new Error('Client not found');
    await client.delete();
    return true;
  }
}
