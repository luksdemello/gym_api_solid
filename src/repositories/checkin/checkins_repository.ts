import { type Checkin, type Prisma } from '@prisma/client'

interface CheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
}

export { CheckInsRepository }
