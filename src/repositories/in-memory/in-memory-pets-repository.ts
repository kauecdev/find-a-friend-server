import type { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import type { FindByRequestParams, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByRequest({
    ngoIds,
    age,
    size,
    energyLevel,
    independencyLevel,
  }: FindByRequestParams) {
    const pets = this.items.filter(item => {
      return (
        ngoIds.includes(item.ngo_id) &&
        (age === undefined || item.age === age) &&
        (size === undefined || item.size === size) &&
        (energyLevel === undefined || item.energy_level === energyLevel) &&
        (independencyLevel === undefined ||
          item.independency_level === independencyLevel)
      )
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
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
