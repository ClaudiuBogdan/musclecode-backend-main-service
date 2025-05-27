/*
  Warnings:

  - You are about to drop the column `userId` on the `ContentNode` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('MEMBER', 'ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "PermissionLevel" AS ENUM ('VIEW', 'INTERACT', 'EDIT', 'MANAGE', 'OWNER');

-- DropIndex
DROP INDEX "ContentNode_type_idx";

-- DropIndex
DROP INDEX "ContentNode_userId_idx";

-- AlterTable
ALTER TABLE "ContentNode" DROP COLUMN "userId",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PermissionGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermissionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "GroupRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExplicitPermission" (
    "id" TEXT NOT NULL,
    "contentNodeId" TEXT NOT NULL,
    "userId" TEXT,
    "groupId" TEXT,
    "permissionLevel" "PermissionLevel" NOT NULL,
    "grantedBy" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExplicitPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EffectivePermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentNodeId" TEXT NOT NULL,
    "permissionLevel" "PermissionLevel" NOT NULL,
    "sourceId" TEXT NOT NULL,
    "grantingUserId" TEXT NOT NULL,
    "computedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EffectivePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PermissionGroup_ownerId_idx" ON "PermissionGroup"("ownerId");

-- CreateIndex
CREATE INDEX "GroupMember_userId_idx" ON "GroupMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_groupId_userId_key" ON "GroupMember"("groupId", "userId");

-- CreateIndex
CREATE INDEX "ExplicitPermission_contentNodeId_idx" ON "ExplicitPermission"("contentNodeId");

-- CreateIndex
CREATE INDEX "ExplicitPermission_userId_idx" ON "ExplicitPermission"("userId");

-- CreateIndex
CREATE INDEX "ExplicitPermission_groupId_idx" ON "ExplicitPermission"("groupId");

-- CreateIndex
CREATE INDEX "ExplicitPermission_grantedBy_idx" ON "ExplicitPermission"("grantedBy");

-- CreateIndex
CREATE UNIQUE INDEX "ExplicitPermission_contentNodeId_userId_groupId_permissionL_key" ON "ExplicitPermission"("contentNodeId", "userId", "groupId", "permissionLevel");

-- CreateIndex
CREATE INDEX "EffectivePermission_userId_permissionLevel_idx" ON "EffectivePermission"("userId", "permissionLevel");

-- CreateIndex
CREATE INDEX "EffectivePermission_contentNodeId_permissionLevel_idx" ON "EffectivePermission"("contentNodeId", "permissionLevel");

-- CreateIndex
CREATE UNIQUE INDEX "EffectivePermission_userId_contentNodeId_key" ON "EffectivePermission"("userId", "contentNodeId");

-- CreateIndex
CREATE INDEX "ContentNode_type_status_idx" ON "ContentNode"("type", "status");

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "PermissionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExplicitPermission" ADD CONSTRAINT "ExplicitPermission_contentNodeId_fkey" FOREIGN KEY ("contentNodeId") REFERENCES "ContentNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExplicitPermission" ADD CONSTRAINT "ExplicitPermission_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "PermissionGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EffectivePermission" ADD CONSTRAINT "EffectivePermission_contentNodeId_fkey" FOREIGN KEY ("contentNodeId") REFERENCES "ContentNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
