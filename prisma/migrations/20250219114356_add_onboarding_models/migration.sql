-- CreateTable
CREATE TABLE "UserOnboarding" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentStep" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOnboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGoals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "onboardingId" TEXT NOT NULL,
    "learningGoals" TEXT[],
    "studyTime" INTEGER NOT NULL,
    "experienceLevel" TEXT NOT NULL,
    "preferredTopics" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGoals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResults" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "onboardingId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "score" INTEGER NOT NULL,
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingQuizQuestion" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correctOption" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingQuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnboarding_userId_key" ON "UserOnboarding"("userId");

-- CreateIndex
CREATE INDEX "UserOnboarding_userId_idx" ON "UserOnboarding"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoals_userId_key" ON "UserGoals"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoals_onboardingId_key" ON "UserGoals"("onboardingId");

-- CreateIndex
CREATE INDEX "UserGoals_userId_idx" ON "UserGoals"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizResults_userId_key" ON "QuizResults"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizResults_onboardingId_key" ON "QuizResults"("onboardingId");

-- CreateIndex
CREATE INDEX "QuizResults_userId_idx" ON "QuizResults"("userId");

-- CreateIndex
CREATE INDEX "OnboardingQuizQuestion_topic_difficulty_idx" ON "OnboardingQuizQuestion"("topic", "difficulty");

-- AddForeignKey
ALTER TABLE "UserGoals" ADD CONSTRAINT "UserGoals_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "UserOnboarding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResults" ADD CONSTRAINT "QuizResults_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "UserOnboarding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
