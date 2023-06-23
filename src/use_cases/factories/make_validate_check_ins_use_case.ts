import { ValidateCheckInUsecase } from '../validate_check_in'
import { PrismaCheckInsRepository } from '@/repositories/checkin/prisma_checkins_repository'

export function makeValidateCheckInUsecase(): ValidateCheckInUsecase {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUsecase(checkInsRepository)

  return useCase
}
