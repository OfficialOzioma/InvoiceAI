import prisma from '../lib/prisma.js';

export class InvoiceModel {
  static async getAllByUserId(userId: string) {
    return await prisma.invoice.findMany({
      where: { userId },
      include: {
        client: {
          select: { name: true, email: true }
        },
        lineItems: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getById(userId: string, invoiceId: string) {
    return await prisma.invoice.findFirst({
      where: { 
        id: invoiceId,
        userId
      },
      include: {
        client: true,
        lineItems: true
      }
    });
  }

  static async create(data: any) {
    const { lineItems, ...invoiceData } = data;
    return await prisma.invoice.create({
      data: {
        ...invoiceData,
        lineItems: {
          create: lineItems
        }
      },
      include: {
        lineItems: true
      }
    });
  }

  static async updateStatus(invoiceId: string, status: string) {
    return await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status }
    });
  }

  static async delete(invoiceId: string) {
    return await prisma.invoice.delete({
      where: { id: invoiceId }
    });
  }
}
