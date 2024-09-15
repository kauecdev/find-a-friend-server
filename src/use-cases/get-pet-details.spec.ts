import { beforeEach, describe, expect, it } from 'vitest'
import type { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found'

let petsRepository: PetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)

    await petsRepository.create({
      id: 'pet-01',
      ngo_id: 'ngo-01',
      name: 'Puppy',
      about: '',
      age: 'PUP',
      size: 'MEDIUM',
      energy_level: 'MEDIUM',
      independency_level: 'MEDIUM',
    })
  })

  it('should be able to get pet details', async () => {
    const { pet } = await sut.execute({ id: 'pet-01' })

    expect(pet.id).toEqual('pet-01')
  })

  it('should not be able get a non-existing pet', async () => {
    await expect(() =>
      sut.execute({ id: 'non-existing-pet ' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
