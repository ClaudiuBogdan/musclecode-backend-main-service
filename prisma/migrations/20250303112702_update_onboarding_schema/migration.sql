/*
  Warnings:

  - You are about to drop the column `recommendations` on the `QuizResults` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `QuizResults` table. All the data in the column will be lost.
  - You are about to drop the column `experienceLevel` on the `UserGoals` table. All the data in the column will be lost.
  - You are about to drop the column `learningGoals` on the `UserGoals` table. All the data in the column will be lost.
  - You are about to drop the column `preferredTopics` on the `UserGoals` table. All the data in the column will be lost.
  - You are about to drop the `OnboardingQuizQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "QuizResults" DROP COLUMN "recommendations",
DROP COLUMN "score";

-- AlterTable
ALTER TABLE "UserGoals" DROP COLUMN "experienceLevel",
DROP COLUMN "learningGoals",
DROP COLUMN "preferredTopics",
ADD COLUMN     "selectedCollections" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "studyTime" SET DEFAULT 30;

-- DropTable
DROP TABLE "OnboardingQuizQuestion";
