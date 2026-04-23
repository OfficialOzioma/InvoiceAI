import prisma from '../lib/prisma.js';

export class ClientModel {
  static async getAllByUserId(userId: string) {
    return await prisma.client.findMany({
      where: { userId },
      orderBy: { name: 'asc' }
    });
  }

  static async getById(userId: string, clientId: string) {
    return await prisma.client.findFirst({
      where: { 
        id: clientId,
        userId
      }
    });
  }

  static async create(data: any) {
    return await prisma.client.create({
      data
    });
  }

  static async update(clientId: string, data: any) {
    return await prisma.client.update({
      where: { id: clientId },
      data
    });
  }

  static async delete(clientId: string) {
    return await prisma.client.delete({
      where: { id: clientId }
    });
  }
}
