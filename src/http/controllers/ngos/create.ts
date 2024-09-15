import { NgoAlreadyExistsError } from '@/use-cases/errors/ngo-already-exists-error'
import { makeCreateNgoUseCase } from '@/use-cases/factories/make-create-ngo-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string().min(1),
    directorName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    city: z.string().min(1),
    state: z.string().length(2),
    zipCode: z.string().min(1),
    address: z.string().min(1),
    whatsappPhone: z.string().min(1),
  })

  const {
    name,
    directorName,
    email,
    password,
    city,
    state,
    zipCode,
    address,
    whatsappPhone,
  } = createBodySchema.parse(request.body)

  try {
    const createNgoUseCase = makeCreateNgoUseCase()

    await createNgoUseCase.execute({
      name,
      directorName,
      email,
      password,
      city,
      state,
      zipCode,
      address,
      whatsappPhone,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof NgoAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
