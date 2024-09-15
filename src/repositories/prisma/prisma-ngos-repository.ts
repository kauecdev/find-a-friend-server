import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { NgosRepository } from '../ngos-repository'

export class PrismaNgosRepository implements NgosRepository {
  async findById(id: string) {
    const ngo = await prisma.ngo.findUnique({
      where: {
        id,
      },
    })

    return ngo
  }

  async findByEmail(email: string) {
    const ngo = await prisma.ngo.findUnique({
      where: {
        email,
      },
    })

    return ngo
  }

  async findManyByCityAndState(city: string, state: string) {
    const ngos = await prisma.ngo.findMany({
      where: {
        city,
        state,
      },
    })

    return ngos
  }

  async create(data: Prisma.NgoCreateInput) {
    const ngo = await prisma.ngo.create({
      data,
    })

    return ngo
  }
}
