import { PrismaGymsRepository } from '@/repositories/gym/prisma_gyms_repository'
import { CheckInUseCase } from '../checkin'
import { PrismaCheckInsRepository } from '@/repositories/checkin/prisma_checkins_repository'

export function makeCheckInUseCase(): CheckInUseCase {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
