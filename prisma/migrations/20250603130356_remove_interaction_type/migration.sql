/*
  Warnings:

  - You are about to drop the column `type` on the `InteractionData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InteractionData" DROP COLUMN "type";

-- DropEnum
DROP TYPE "InteractionType";
