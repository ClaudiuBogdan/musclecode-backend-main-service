/*
  Warnings:

  - Added the required column `reviewDate` to the `AlgorithmUserData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `AlgorithmUserData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AlgorithmUserData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewDate" DATETIME NOT NULL,
    "schedule" TEXT NOT NULL,
    CONSTRAINT "AlgorithmUserData_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "AlgorithmTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AlgorithmUserData" ("algorithmId", "createdAt", "id", "notes", "userId") SELECT "algorithmId", "createdAt", "id", "notes", "userId" FROM "AlgorithmUserData";
DROP TABLE "AlgorithmUserData";
ALTER TABLE "new_AlgorithmUserData" RENAME TO "AlgorithmUserData";
CREATE INDEX "AlgorithmUserData_userId_idx" ON "AlgorithmUserData"("userId");
CREATE UNIQUE INDEX "AlgorithmUserData_userId_algorithmId_key" ON "AlgorithmUserData"("userId", "algorithmId");
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
    "schedule" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Submission_algorithmUserDataId_fkey" FOREIGN KEY ("algorithmUserDataId") REFERENCES "AlgorithmUserData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Submission" ("algorithmId", "algorithmUserDataId", "code", "createdAt", "difficulty", "id", "language", "notes", "timeSpent", "userId") SELECT "algorithmId", "algorithmUserDataId", "code", "createdAt", "difficulty", "id", "language", "notes", "timeSpent", "userId" FROM "Submission";
DROP TABLE "Submission";
ALTER TABLE "new_Submission" RENAME TO "Submission";
CREATE INDEX "Submission_userId_algorithmId_idx" ON "Submission"("userId", "algorithmId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
