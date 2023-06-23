import { PrismaGymsRepository } from '@/repositories/gym/prisma_gyms_repository'
import { SearchGymsUseCase } from '../search_gyms'

export function makeSearchGymsUseCase(): SearchGymsUseCase {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
