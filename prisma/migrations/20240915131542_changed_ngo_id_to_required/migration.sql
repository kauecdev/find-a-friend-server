/*
  Warnings:

  - Made the column `ngo_id` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_ngo_id_fkey";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "ngo_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ngo_id_fkey" FOREIGN KEY ("ngo_id") REFERENCES "ngos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
