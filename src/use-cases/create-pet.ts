import type { NgosRepository } from '@/repositories/ngos-repository'
import type { PetsRepository } from '@/repositories/pets-repository'
import type { Age, EnergyLevel, IndependencyLevel, Size } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CreatePetUseCaseRequest {
  ngoId: string
  name: string
  about: string
  age: Age
  size: Size
  energyLevel: EnergyLevel
  independencyLevel: IndependencyLevel
  requirements: string[]
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private ngosRepository: NgosRepository
  ) {}

  async execute(data: CreatePetUseCaseRequest) {
    const ngo = await this.ngosRepository.findById(data.ngoId)

    if (!ngo) {
      throw new ResourceNotFoundError()
    }

    const requirements = data.requirements.join(', ')

    const pet = await this.petsRepository.create({
      ngo_id: data.ngoId,
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energyLevel,
      independency_level: data.independencyLevel,
      requirements,
    })

    return {
      pet,
    }
  }
}
