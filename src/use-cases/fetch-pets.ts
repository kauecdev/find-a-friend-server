import type { NgosRepository } from '@/repositories/ngos-repository'
import type { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsUseCaseRequest {
  city: string
  state: string
  age?: string
  size?: string
  energyLevel?: string
  independencyLevel?: string
}

export class FetchPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private ngosRepository: NgosRepository
  ) {}

  async execute({
    city,
    state,
    age,
    size,
    energyLevel,
    independencyLevel,
  }: FetchPetsUseCaseRequest) {
    const ngos = await this.ngosRepository.findManyByCityAndState(city, state)

    if (ngos.length === 0) {
      return {
        pets: [],
      }
    }

    const pets = await this.petsRepository.findManyByRequest({
      ngoIds: ngos.map(ngo => ngo.id),
      age,
      size,
      energyLevel,
      independencyLevel,
    })

    return {
      pets,
    }
  }
}
