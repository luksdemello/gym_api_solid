import { type Prisma, type Checkin } from '@prisma/client'
import { type CheckInsRepository } from './checkins_repository'
import { randomUUID } from 'crypto'

class InMemoryCheckInsRepository implements CheckInsRepository {
  checkIns: Checkin[] = []

  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn: Checkin = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      is_validated: data.is_validated ? new Date(data.is_validated) : null,
      create_at: new Date()
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}

export { InMemoryCheckInsRepository }
