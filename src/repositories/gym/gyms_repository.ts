import { type Prisma, type Gym } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>
  findMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findManyNearby(data: FindManyNearbyParams): Promise<Gym[]>
}

export { GymsRepository }
