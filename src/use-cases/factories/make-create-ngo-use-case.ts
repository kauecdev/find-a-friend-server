import { PrismaNgosRepository } from '@/repositories/prisma/prisma-ngos-repository'
import { CreateNgoUseCase } from '../create-ngo'

export function makeCreateNgoUseCase() {
  const ngosRepository = new PrismaNgosRepository()

  return new CreateNgoUseCase(ngosRepository)
}
