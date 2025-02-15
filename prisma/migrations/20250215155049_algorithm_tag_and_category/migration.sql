/*
  Warnings:

  - You are about to drop the column `category` on the `AlgorithmTemplate` table. All the data in the column will be lost.
  - The `tags` column on the `AlgorithmTemplate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "AlgorithmTemplate_category_idx";

-- AlterTable
ALTER TABLE "AlgorithmTemplate" DROP COLUMN "category",
ADD COLUMN     "categories" TEXT[],
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE INDEX "AlgorithmTemplate_categories_idx" ON "AlgorithmTemplate"("categories");
