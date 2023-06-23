import { Prisma, type Gym } from '@prisma/client'
import { type GymsRepository } from './gyms_repository'
import { randomUUID } from 'crypto'

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
}

export { InMemoryGymsRepository }
