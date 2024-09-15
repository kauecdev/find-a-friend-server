import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets'

export function makeFetchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const ngosRepository = new PrismaNgosRepository()

  return new FetchPetsUseCase(petsRepository, ngosRepository)
}
