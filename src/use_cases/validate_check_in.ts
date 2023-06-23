import { LateCheckInValidationError } from '@/errors/late_check_in_validation_error'
import { ResourceNotFoundError } from '@/errors/resource_not_found_error'
import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'
import { type Checkin } from '@prisma/client'
import dayjs from 'dayjs'

interface ValidateCheckInUsecaseRequest {
  checkInId: string
}

interface ValidateCheckInUsecaseResponse {
  checkIn: Checkin
}

class ValidateCheckInUsecase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository

  ) {}

  async execute({ checkInId }: ValidateCheckInUsecaseRequest): Promise<ValidateCheckInUsecaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.create_at, 'minutes')

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.is_validated = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn
    }
  }
}

export { ValidateCheckInUsecase }
