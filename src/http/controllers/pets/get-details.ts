import { NgoAlreadyExistsError } from '@/use-cases/errors/ngo-already-exists-error'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {
  const getDetailsParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  const { pet } = await getPetDetailsUseCase.execute({ id })

  return reply.status(200).send({ pet })
}
