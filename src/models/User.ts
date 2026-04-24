import prisma from '../lib/prisma.js';

export class UserModel {
  static async getById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            organization: true
          }
        }
      }
    });
  }

  // Ensures a user exists in our DB, linked to a Supabase Auth UID
  static async upsert(id: string, email: string, name?: string) {
    console.log(`Upserting user in Prisma with id: ${id}, email: ${email}, name: ${name}`);
    return await prisma.user.upsert({
      where: { id },
      update: {
        email,
        name: name || undefined
      },
      create: {
        id,
        email,
        name
      }
    });
  }
}
