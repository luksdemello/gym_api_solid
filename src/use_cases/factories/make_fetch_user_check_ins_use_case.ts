import { PrismaCheckInsRepository } from '@/repositories/checkin/prisma_checkins_repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch_user_check_ins_history'

export function makeFetchUserCheckInsHistoryUseCase(): FetchUserCheckInsHistoryUseCase {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
