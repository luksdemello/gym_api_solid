import { type Checkin, type Prisma } from '@prisma/client'

interface CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
}

export { CheckInsRepository }
