import { type Prisma, type Checkin } from '@prisma/client'
import { type CheckInsRepository } from './checkins_repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn = await prisma.checkin.create({ data })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        create_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    const checkIns = await prisma.checkin.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkin.count({
      where: {
        user_id: userId
      }
    })

    return count
  }

  async findById(checkInId: string): Promise<Checkin | null> {
    const checkIn = await prisma.checkin.findUnique({ where: { id: checkInId } })

    return checkIn
  }

  async save(checkIn: Checkin): Promise<Checkin> {
    const checkInUpdated = await prisma.checkin.update({
      where: { id: checkIn.id },
      data: checkIn
    })

    return checkInUpdated
  }
}

export { PrismaCheckInsRepository }
