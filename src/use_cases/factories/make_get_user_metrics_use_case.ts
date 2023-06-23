import { GetUserMetricsUseCase } from '../get_user_metrics'
import { PrismaCheckInsRepository } from '@/repositories/checkin/prisma_checkins_repository'

export function makeGetUserMetricsUseCase(): GetUserMetricsUseCase {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
