import { type Prisma, type Gym } from '@prisma/client'
import { type GymsRepository } from './gyms_repository'
import { randomUUID } from 'crypto'
import { type Decimal } from '@prisma/client/runtime'

class InMemoryGymsRepository implements GymsRepository {
  gyms: Gym[] = []

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find(gym => gym.id === gymId)

    return gym ?? null
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: randomUUID(),
      description: data.description ?? '',
      phone: data.phone ?? '',
      title: data.title,
      latitude: data.latitude as Decimal,
      longitude: data.longitude as Decimal
    }

    this.gyms.push(gym)

    return gym
  }
}

export { InMemoryGymsRepository }
