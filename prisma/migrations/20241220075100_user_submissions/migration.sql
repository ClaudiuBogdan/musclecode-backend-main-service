/*
  Warnings:

  - You are about to drop the `DailyAlgorithm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `algorithmUserDataId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "DailyAlgorithm_userId_algorithmId_date_key";

-- DropIndex
DROP INDEX "DailyAlgorithm_userId_date_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DailyAlgorithm";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Submission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "algorithmUserDataId" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "notes" TEXT,
    "difficulty" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Submission_algorithmUserDataId_fkey" FOREIGN KEY ("algorithmUserDataId") REFERENCES "AlgorithmUserData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Submission" ("algorithmId", "code", "createdAt", "difficulty", "id", "language", "notes", "timeSpent", "userId") SELECT "algorithmId", "code", "createdAt", "difficulty", "id", "language", "notes", "timeSpent", "userId" FROM "Submission";
DROP TABLE "Submission";
ALTER TABLE "new_Submission" RENAME TO "Submission";
CREATE INDEX "Submission_userId_algorithmId_idx" ON "Submission"("userId", "algorithmId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
