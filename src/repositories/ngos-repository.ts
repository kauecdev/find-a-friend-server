import { Ngo, Prisma } from "@prisma/client";

export interface NgosRepository {
  findByEmail(email: string): Promise<Ngo | null>
  create(data: Prisma.NgoCreateInput): Promise<Ngo>
}