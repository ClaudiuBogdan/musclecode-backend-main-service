/*
  Warnings:

  - Changed the type of `tags` on the `AlgorithmTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `files` on the `AlgorithmTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `scheduleData` on the `AlgorithmUserData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `scheduleData` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
DELETE FROM "DailyAlgorithm";
DELETE FROM "AlgorithmUserData";
DELETE FROM "Submission";
DELETE FROM "AlgorithmTemplate";

-- AlterTable
ALTER TABLE "AlgorithmTemplate" ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "userId" TEXT,
DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB NOT NULL,
DROP COLUMN "files",
ADD COLUMN     "files" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "AlgorithmUserData" DROP COLUMN "scheduleData",
ADD COLUMN     "scheduleData" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "scheduleData",
ADD COLUMN     "scheduleData" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlgorithmCollection" (
    "algorithmId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "AlgorithmCollection_pkey" PRIMARY KEY ("algorithmId","collectionId")
);

-- CreateIndex
CREATE INDEX "Collection_userId_idx" ON "Collection"("userId");

-- CreateIndex
CREATE INDEX "Collection_parentId_idx" ON "Collection"("parentId");

-- CreateIndex
CREATE INDEX "AlgorithmCollection_collectionId_idx" ON "AlgorithmCollection"("collectionId");

-- CreateIndex
CREATE INDEX "AlgorithmTemplate_userId_idx" ON "AlgorithmTemplate"("userId");

-- CreateIndex
CREATE INDEX "AlgorithmTemplate_parentId_idx" ON "AlgorithmTemplate"("parentId");

-- AddForeignKey
ALTER TABLE "AlgorithmTemplate" ADD CONSTRAINT "AlgorithmTemplate_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "AlgorithmTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlgorithmCollection" ADD CONSTRAINT "AlgorithmCollection_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "AlgorithmTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlgorithmCollection" ADD CONSTRAINT "AlgorithmCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
