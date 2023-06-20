import { PrismaUsersRepository } from '@/repositories/user/prisma_users_repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
