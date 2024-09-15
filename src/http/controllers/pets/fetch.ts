import { NgoAlreadyExistsError } from '@/use-cases/errors/ngo-already-exists-error'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { Age, EnergyLevel, IndependencyLevel, Size } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    age: z.nativeEnum(Age).optional(),
    size: z.nativeEnum(Size).optional(),
    energyLevel: z.nativeEnum(EnergyLevel).optional(),
    independencyLevel: z.nativeEnum(IndependencyLevel).optional(),
  })

  const { city, state, age, size, energyLevel, independencyLevel } =
    fetchQuerySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    state,
    age,
    size,
    energyLevel,
    independencyLevel,
  })

  return reply.status(200).send({ pets })
}
