import { PrismaGymsRepository } from '@/repositories/gym/prisma_gyms_repository'
import { FeatchNearbyGymsUseCase } from '../fetch_nearby_gyms'

export function makeFeatchNearbyGymsUseCase(): FeatchNearbyGymsUseCase {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FeatchNearbyGymsUseCase(gymsRepository)

  return useCase
}
