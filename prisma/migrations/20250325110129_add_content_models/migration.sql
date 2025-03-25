-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('MODULE', 'LESSON', 'EXERCISE', 'NOTE', 'ARTICLE');

-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('REFERENCE', 'DEPENDENCY', 'RELATES_TO', 'EXTENDS');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('QUIZ', 'FLASHCARD');

-- CreateTable
CREATE TABLE "ContentNode" (
    "id" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "body" JSONB NOT NULL,
    "metadata" JSONB,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentLink" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "linkType" "LinkType" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteractionData" (
    "id" TEXT NOT NULL,
    "type" "InteractionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "nodeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InteractionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentNodeTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ContentNodeTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "ContentNode_userId_idx" ON "ContentNode"("userId");

-- CreateIndex
CREATE INDEX "ContentNode_type_idx" ON "ContentNode"("type");

-- CreateIndex
CREATE INDEX "ContentLink_fromId_toId_idx" ON "ContentLink"("fromId", "toId");

-- CreateIndex
CREATE INDEX "ContentLink_userId_idx" ON "ContentLink"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentLink_fromId_toId_linkType_key" ON "ContentLink"("fromId", "toId", "linkType");

-- CreateIndex
CREATE INDEX "InteractionData_nodeId_idx" ON "InteractionData"("nodeId");

-- CreateIndex
CREATE INDEX "InteractionData_userId_idx" ON "InteractionData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_ContentNodeTags_B_index" ON "_ContentNodeTags"("B");

-- AddForeignKey
ALTER TABLE "ContentLink" ADD CONSTRAINT "ContentLink_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "ContentNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentLink" ADD CONSTRAINT "ContentLink_toId_fkey" FOREIGN KEY ("toId") REFERENCES "ContentNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteractionData" ADD CONSTRAINT "InteractionData_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "ContentNode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentNodeTags" ADD CONSTRAINT "_ContentNodeTags_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentNode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentNodeTags" ADD CONSTRAINT "_ContentNodeTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
