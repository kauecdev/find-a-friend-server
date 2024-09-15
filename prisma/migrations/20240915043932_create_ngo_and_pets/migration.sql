-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUP', 'ADULT', 'ELDERLY');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "IndependencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "ngos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "director_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp_phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ngos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy_level" "EnergyLevel" NOT NULL,
    "independency_level" "IndependencyLevel" NOT NULL,
    "requirements" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ngo_id" TEXT,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ngos_email_key" ON "ngos"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ngo_id_fkey" FOREIGN KEY ("ngo_id") REFERENCES "ngos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
