-- AlterTable
ALTER TABLE "ContentNode" ALTER COLUMN "defaultPermission" SET DEFAULT 'INTERACT';

-- AlterTable
ALTER TABLE "ExplicitPermission" ALTER COLUMN "grantedBy" DROP NOT NULL;
