import { ResourceNotFoundError } from '@/errors/resource_not_found_error'
import { type CheckInsRepository } from '@/repositories/checkin/checkins_repository'
import { type GymsRepository } from '@/repositories/gym/gyms_repository'
import { type Checkin } from '@prisma/client'
import { getDistanceBetweenCoordinates } from '../utils/get_distance_between_coordinates'

interface CheckInUseCaseRequest {
  gymId: string
  userId: string
  userLatitude: number
  userLogintude: number
}

interface CheckInUseCaseResponse {
  checkIn: Checkin
}

class CheckInUseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository
  ) {}

  async execute({ gymId, userId, userLatitude, userLogintude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calc distance
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLogintude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    console.log(distance)

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId, user_id: userId
    })

    return {
      checkIn
    }
  }
}

export { CheckInUseCase }
