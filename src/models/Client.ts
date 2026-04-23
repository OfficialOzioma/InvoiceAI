import prisma from '../lib/prisma.js';

export class ClientModel {
  static async getAllByOrganizationId(organizationId: string) {
    return await prisma.client.findMany({
      where: { organizationId },
      orderBy: { name: 'asc' }
    });
  }

  static async getById(organizationId: string, clientId: string) {
    return await prisma.client.findFirst({
      where: { 
        id: clientId,
        organizationId
      }
    });
  }

  static async create(organizationId: string, data: any) {
    return await prisma.client.create({
      data: {
        ...data,
        organizationId
      }
    });
  }

  static async update(organizationId: string, clientId: string, data: any) {
    return await prisma.client.update({
      where: { 
        id: clientId,
        organizationId
      },
      data
    });
  }

  static async delete(organizationId: string, clientId: string) {
    return await prisma.client.delete({
      where: { 
        id: clientId,
        organizationId
      }
    });
  }
}
