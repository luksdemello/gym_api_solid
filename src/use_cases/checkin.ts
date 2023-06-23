import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'
import { type Checkin } from '@prisma/client'

interface CheckInUseCaseRequest {
  gymId: string
  userId: string
}

interface CheckInUseCaseResponse {
  checkIn: Checkin
}

class CheckInUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({ gymId, userId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId, user_id: userId
    })

    return {
      checkIn
    }
  }
}

export { CheckInUseCase }
