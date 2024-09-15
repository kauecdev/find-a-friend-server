import type { Pet, Prisma } from '@prisma/client'
import type { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      ngo_id: data.ngo_id,
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      requirements: data.requirements ?? null,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
