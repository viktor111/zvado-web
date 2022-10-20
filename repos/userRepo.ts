import { PrismaClient, User } from "@prisma/client";

class UserRepo {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

    async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

    async createUser(user: User) {
    return this.prisma.user.create({
      data: user,
    });
  }
}

export default UserRepo;
