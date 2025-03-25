-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'CREATED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "ContentNode" ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT';
