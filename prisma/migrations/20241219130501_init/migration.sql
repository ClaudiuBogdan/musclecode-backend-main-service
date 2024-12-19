-- CreateTable
CREATE TABLE "AlgorithmTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AlgorithmUserData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AlgorithmUserData_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "AlgorithmTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "notes" TEXT,
    "difficulty" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "AlgorithmTemplate_category_idx" ON "AlgorithmTemplate"("category");

-- CreateIndex
CREATE INDEX "AlgorithmUserData_userId_idx" ON "AlgorithmUserData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AlgorithmUserData_userId_algorithmId_key" ON "AlgorithmUserData"("userId", "algorithmId");

-- CreateIndex
CREATE INDEX "DailyAlgorithm_userId_date_idx" ON "DailyAlgorithm"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyAlgorithm_userId_algorithmId_date_key" ON "DailyAlgorithm"("userId", "algorithmId", "date");

-- CreateIndex
CREATE INDEX "Submission_userId_algorithmId_idx" ON "Submission"("userId", "algorithmId");
