import { Prisma, type Gym } from '@prisma/client'
import { type FindManyNearbyParams, type GymsRepository } from './gyms_repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get_distance_between_coordinates'

class InMemoryGymsRepository implements GymsRepository {
  gyms: Gym[] = []

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find(gym => gym.id === gymId)

    return gym ?? null
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      phone: data.phone ?? null,
      title: data.title,
      latitude: new Prisma.Decimal(data.latitude as number),
      longitude: new Prisma.Decimal(data.longitude as number)
    }

    this.gyms.push(gym)

    return gym
  }

  async findMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.gyms.filter(gym => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyNearby(data: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: data.latitude, longitude: data.longitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
      )

      return distance < 10
    })

    return gyms
  }
}

export { InMemoryGymsRepository }
