import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const ngosRepository = new PrismaNgosRepository()

  return new CreatePetUseCase(petsRepository, ngosRepository)
}
