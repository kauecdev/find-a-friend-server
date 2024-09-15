import type { Pet, Prisma } from '@prisma/client'

export interface FindByRequestParams {
  ngoIds: string[]
  age?: string
  size?: string
  energyLevel?: string
  independencyLevel?: string
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByRequest(params: FindByRequestParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
