import { type Prisma, type Checkin } from '@prisma/client'
import { type CheckInsRepository } from './checkins_repository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

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

  async findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((checkin) => {
      const checkInDate = dayjs(checkin.create_at)

      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkin.user_id === userId && isOnSameDate
    }
    )

    return checkInOnSameDate ?? null
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    return this.checkIns.filter(item => item.user_id === userId).slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter(item => item.user_id === userId).length
  }

  async findById(checkInId: string): Promise<Checkin | null> {
    const checkIn = this.checkIns.find(item => item.id === checkInId)

    return checkIn ?? null
  }

  async save(checkIn: Checkin): Promise<Checkin> {
    const checkInIndex = this.checkIns.findIndex(item => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }
}

export { InMemoryCheckInsRepository }
