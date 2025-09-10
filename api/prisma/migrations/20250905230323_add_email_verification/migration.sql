/*
  Warnings:

  - You are about to drop the column `createdAt` on the `VerificationToken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."VerificationToken" DROP CONSTRAINT "VerificationToken_userId_fkey";

-- AlterTable
ALTER TABLE "public"."VerificationToken" DROP COLUMN "createdAt";

-- CreateIndex
CREATE INDEX "Brand_ownerId_idx" ON "public"."Brand"("ownerId");

-- CreateIndex
CREATE INDEX "Brand_createdAt_idx" ON "public"."Brand"("createdAt");

-- CreateIndex
CREATE INDEX "Channel_brandId_idx" ON "public"."Channel"("brandId");

-- CreateIndex
CREATE INDEX "Channel_type_idx" ON "public"."Channel"("type");

-- CreateIndex
CREATE INDEX "Contact_brandId_idx" ON "public"."Contact"("brandId");

-- CreateIndex
CREATE INDEX "Contact_createdAt_idx" ON "public"."Contact"("createdAt");

-- CreateIndex
CREATE INDEX "Content_brandId_idx" ON "public"."Content"("brandId");

-- CreateIndex
CREATE INDEX "Content_status_idx" ON "public"."Content"("status");

-- CreateIndex
CREATE INDEX "Content_createdAt_idx" ON "public"."Content"("createdAt");

-- CreateIndex
CREATE INDEX "Media_brandId_idx" ON "public"."Media"("brandId");

-- CreateIndex
CREATE INDEX "Media_createdAt_idx" ON "public"."Media"("createdAt");

-- CreateIndex
CREATE INDEX "Member_userId_idx" ON "public"."Member"("userId");

-- CreateIndex
CREATE INDEX "PublishLog_contentId_idx" ON "public"."PublishLog"("contentId");

-- CreateIndex
CREATE INDEX "PublishLog_channel_idx" ON "public"."PublishLog"("channel");

-- CreateIndex
CREATE INDEX "PublishLog_ts_idx" ON "public"."PublishLog"("ts");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "public"."User"("createdAt");

-- CreateIndex
CREATE INDEX "VerificationToken_expiresAt_idx" ON "public"."VerificationToken"("expiresAt");

-- AddForeignKey
ALTER TABLE "public"."VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
