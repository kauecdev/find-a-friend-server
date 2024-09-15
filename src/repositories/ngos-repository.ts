import type { Ngo, Prisma } from '@prisma/client'

export interface NgosRepository {
  findById(id: string): Promise<Ngo | null>
  findByEmail(email: string): Promise<Ngo | null>
  create(data: Prisma.NgoCreateInput): Promise<Ngo>
}
