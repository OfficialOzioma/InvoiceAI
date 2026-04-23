import prisma from '../lib/prisma.js';

export class OrganizationModel {
  static async getById(organizationId: string) {
    return await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        settings: true,
        members: {
          include: {
            user: true
          }
        }
      }
    });
  }

  // Gets the primary/first organization for a user
  static async getPrimaryForUser(userId: string) {
    const membership = await prisma.organizationMember.findFirst({
      where: { userId },
      include: {
        organization: {
          include: {
            settings: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    
    return membership?.organization || null;
  }

  static async create(userId: string, data: any) {
    return await prisma.organization.create({
      data: {
        ...data,
        members: {
          create: {
            userId,
            role: 'OWNER'
          }
        }
      }
    });
  }

  static async update(organizationId: string, data: any) {
    return await prisma.organization.update({
      where: { id: organizationId },
      data
    });
  }
}
