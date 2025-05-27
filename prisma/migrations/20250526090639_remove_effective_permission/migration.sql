/*
  Warnings:

  - You are about to drop the `EffectivePermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EffectivePermission" DROP CONSTRAINT "EffectivePermission_contentNodeId_fkey";

-- DropTable
DROP TABLE "EffectivePermission";
