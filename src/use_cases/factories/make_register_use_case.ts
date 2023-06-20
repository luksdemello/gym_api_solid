import { PrismaUsersRepository } from '@/repositories/user/prisma_users_repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase(): RegisterUseCase {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
