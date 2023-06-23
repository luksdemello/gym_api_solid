import { PrismaUsersRepository } from '@/repositories/user/prisma_users_repository'
import { GetUserProfileUseCase } from '../get_user_profile'

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
