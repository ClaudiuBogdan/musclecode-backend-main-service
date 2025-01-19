-- CreateTable
CREATE TABLE "AlgorithmTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlgorithmTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlgorithmUserData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduleData" TEXT NOT NULL,

    CONSTRAINT "AlgorithmUserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "algorithmUserDataId" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "notes" TEXT,
    "difficulty" TEXT NOT NULL,
    "scheduleData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyAlgorithm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyAlgorithm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AlgorithmTemplate_category_idx" ON "AlgorithmTemplate"("category");

-- CreateIndex
CREATE INDEX "AlgorithmUserData_userId_idx" ON "AlgorithmUserData"("userId");

-- CreateIndex
CREATE INDEX "AlgorithmUserData_due_idx" ON "AlgorithmUserData"("due");

-- CreateIndex
CREATE UNIQUE INDEX "AlgorithmUserData_userId_algorithmId_key" ON "AlgorithmUserData"("userId", "algorithmId");

-- CreateIndex
CREATE INDEX "Submission_userId_algorithmId_idx" ON "Submission"("userId", "algorithmId");

-- CreateIndex
CREATE INDEX "DailyAlgorithm_userId_date_idx" ON "DailyAlgorithm"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyAlgorithm_userId_algorithmId_date_key" ON "DailyAlgorithm"("userId", "algorithmId", "date");

-- AddForeignKey
ALTER TABLE "AlgorithmUserData" ADD CONSTRAINT "AlgorithmUserData_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "AlgorithmTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_algorithmUserDataId_fkey" FOREIGN KEY ("algorithmUserDataId") REFERENCES "AlgorithmUserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyAlgorithm" ADD CONSTRAINT "DailyAlgorithm_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "AlgorithmTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
