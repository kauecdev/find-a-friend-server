import { NgoAlreadyExistsError } from '@/use-cases/errors/ngo-already-exists-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { Age, EnergyLevel, IndependencyLevel, Size } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createParamsSchema = z.object({
    ngoId: z.string(),
  })

  const createBodySchema = z.object({
    name: z.string().min(1),
    about: z.string(),
    age: z.nativeEnum(Age),
    size: z.nativeEnum(Size),
    energyLevel: z.nativeEnum(EnergyLevel),
    independencyLevel: z.nativeEnum(IndependencyLevel),
    requirements: z.array(z.string()),
  })

  const {
    name,
    about,
    age,
    size,
    energyLevel,
    independencyLevel,
    requirements,
  } = createBodySchema.parse(request.body)

  const { ngoId } = createParamsSchema.parse(request.params)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    ngoId,
    name,
    about,
    age,
    size,
    energyLevel,
    independencyLevel,
    requirements,
  })

  return reply.status(201).send()
}
