import type { Ngo, Prisma } from '@prisma/client'
import type { NgosRepository } from '../ngos-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryNgosRepository implements NgosRepository {
  public items: Ngo[] = []

  async findById(id: string) {
    const ngo = this.items.find(item => item.id === id)

    if (!ngo) {
      return null
    }

    return ngo
  }

  async findByEmail(email: string) {
    const ngo = this.items.find(item => item.email === email)

    if (!ngo) {
      return null
    }

    return ngo
  }

  async create(data: Prisma.NgoCreateInput) {
    const ngo = {
      id: data.id ?? randomUUID(),
      name: data.name,
      director_name: data.director_name,
      email: data.email,
      password_hash: data.password_hash,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
      address: data.address,
      whatsapp_phone: data.whatsapp_phone,
      created_at: new Date(),
    }

    this.items.push(ngo)

    return ngo
  }
}
