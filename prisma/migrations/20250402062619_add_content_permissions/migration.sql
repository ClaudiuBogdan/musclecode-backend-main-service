-- CreateEnum
CREATE TYPE "PermissionLevel" AS ENUM ('NONE', 'VIEW', 'INTERACT', 'EDIT', 'MANAGE', 'OWNER');

-- CreateTable
CREATE TABLE "NodePermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "permissionLevel" "PermissionLevel" NOT NULL,
    "sourceNodeId" TEXT NOT NULL,
    "isExplicit" BOOLEAN NOT NULL DEFAULT true,
    "grantingUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NodePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NodePermission_userId_permissionLevel_idx" ON "NodePermission"("userId", "permissionLevel");

-- CreateIndex
CREATE INDEX "NodePermission_nodeId_idx" ON "NodePermission"("nodeId");

-- CreateIndex
CREATE INDEX "NodePermission_sourceNodeId_idx" ON "NodePermission"("sourceNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "NodePermission_userId_nodeId_key" ON "NodePermission"("userId", "nodeId");

-- AddForeignKey
ALTER TABLE "NodePermission" ADD CONSTRAINT "NodePermission_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "ContentNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NodePermission" ADD CONSTRAINT "NodePermission_sourceNodeId_fkey" FOREIGN KEY ("sourceNodeId") REFERENCES "ContentNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
