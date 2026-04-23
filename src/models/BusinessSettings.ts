import prisma from '../lib/prisma.js';

export class BusinessSettingsModel {
  static async getByUserId(userId: string) {
    return await prisma.businessSettings.findUnique({
      where: { userId }
    });
  }

  static async upsert(userId: string, data: any) {
    return await prisma.businessSettings.upsert({
      where: { userId },
      update: data,
      create: {
        ...data,
        userId
      }
    });
  }
}
