import { type Prisma, type Gym } from '@prisma/client'

interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}

export { GymsRepository }