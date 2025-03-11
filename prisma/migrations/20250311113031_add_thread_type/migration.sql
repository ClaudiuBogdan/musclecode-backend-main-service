/*
  Warnings:

  - Made the column `messages` on table `ChatThread` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChatThread" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'chat',
ALTER COLUMN "messages" SET NOT NULL,
ALTER COLUMN "messages" SET DEFAULT '[]';
