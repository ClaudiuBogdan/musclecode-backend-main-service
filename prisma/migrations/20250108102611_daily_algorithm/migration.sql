-- CreateTable
CREATE TABLE "DailyAlgorithm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DailyAlgorithm_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "AlgorithmTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "DailyAlgorithm_userId_date_idx" ON "DailyAlgorithm"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyAlgorithm_userId_algorithmId_date_key" ON "DailyAlgorithm"("userId", "algorithmId", "date");
