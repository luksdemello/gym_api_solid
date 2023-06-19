import { prisma } from '@/lib/prisma'
import { type User, type Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async create (data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash
      }
    })

    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }
}
