import { type Prisma, type User } from '@prisma/client'
import { type UsersRepository } from './users_repository'

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = []

  constructor() {}

  async create (data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: 'any',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.users.push(user)

    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    return user ?? null
  }

  async findById (userId: string): Promise<User | null> {
    const user = this.users.find(user => user.id === userId)

    return user ?? null
  }
}
