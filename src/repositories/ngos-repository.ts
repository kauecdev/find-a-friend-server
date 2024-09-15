import type { Ngo, Prisma } from '@prisma/client'

export interface NgosRepository {
  findById(id: string): Promise<Ngo | null>
  findByEmail(email: string): Promise<Ngo | null>
  findManyByCityAndState(city: string, state: string): Promise<Ngo[]>
  create(data: Prisma.NgoCreateInput): Promise<Ngo>
}
