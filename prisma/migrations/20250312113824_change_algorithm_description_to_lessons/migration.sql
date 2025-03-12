/*
  Warnings:

  - You are about to drop the column `description` on the `AlgorithmTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AlgorithmTemplate" DROP COLUMN "description",
ADD COLUMN     "lessons" JSONB NOT NULL DEFAULT '[]';
