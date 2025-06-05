/*
  Warnings:

  - A unique constraint covering the columns `[nodeId,userId]` on the table `InteractionData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InteractionData_nodeId_userId_key" ON "InteractionData"("nodeId", "userId");
