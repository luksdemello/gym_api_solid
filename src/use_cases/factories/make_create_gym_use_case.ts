import { PrismaGymsRepository } from '@/repositories/gym/prisma_gyms_repository'
import { CreateGymUseCase } from '../create_gym'

export function makeCreateGymUseCase(): CreateGymUseCase {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
