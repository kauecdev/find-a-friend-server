import type {
  Age,
  EnergyLevel,
  IndependencyLevel,
  Prisma,
  Size,
} from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { FindByRequestParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByRequest(params: FindByRequestParams) {
    const pets = await prisma.pet.findMany({
      where: {
        ngo_id: {
          in: params.ngoIds,
        },
        ...(params.age && { age: params.age as Age }),
        ...(params.size && { size: params.size as Size }),
        ...(params.energyLevel && {
          energy_level: params.energyLevel as EnergyLevel,
        }),
        ...(params.independencyLevel && {
          independency_level: params.independencyLevel as IndependencyLevel,
        }),
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
