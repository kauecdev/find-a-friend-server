import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { NgosRepository } from '../ngos-repository'

export class PrismaNgosRepository implements NgosRepository {
  async findByEmail(email: string) {
    const ngo = await prisma.ngo.findUnique({
      where: {
        email,
      },
    })

    return ngo
  }

  async create(data: Prisma.NgoCreateInput) {
    const ngo = await prisma.ngo.create({
      data: {
        name: data.name,
        director_name: data.director_name,
        email: data.email,
        password_hash: data.password_hash,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        address: data.address,
        whatsapp_phone: data.whatsapp_phone,
      },
    })

    return ngo
  }
}
