import type { NgosRepository } from '@/repositories/ngos-repository'
import { NgoAlreadyExistsError } from './errors/ngo-already-exists-error'
import { hash } from 'bcryptjs'

interface CreateNgoUseCaseRequest {
  name: string
  directorName: string
  email: string
  password: string
  city: string
  state: string
  zipCode: string
  address: string
  whatsappPhone: string
}

export class CreateNgoUseCase {
  constructor(private ngosRepository: NgosRepository) {}

  async execute({
    name,
    directorName,
    email,
    password,
    city,
    state,
    zipCode,
    address,
    whatsappPhone,
  }: CreateNgoUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const ngoWithSameEmail = await this.ngosRepository.findByEmail(email)

    if (ngoWithSameEmail) {
      throw new NgoAlreadyExistsError()
    }

    const ngo = await this.ngosRepository.create({
      name,
      director_name: directorName,
      email,
      password_hash,
      city,
      state,
      zip_code: zipCode,
      address,
      whatsapp_phone: whatsappPhone,
    })

    return {
      ngo,
    }
  }
}
