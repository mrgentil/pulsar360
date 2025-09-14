/*
  Warnings:

  - You are about to drop the column `token` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `channel` on the `PublishLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandId,type]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandId,email]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandId,phone]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentChannelId` to the `PublishLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."ContentStatus" ADD VALUE 'FAILED';

-- DropForeignKey
ALTER TABLE "public"."Channel" DROP CONSTRAINT "Channel_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contact" DROP CONSTRAINT "Contact_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Content" DROP CONSTRAINT "Content_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_brandId_fkey";

-- DropIndex
DROP INDEX "public"."PublishLog_channel_idx";

-- DropIndex
DROP INDEX "public"."PublishLog_contentId_idx";

-- AlterTable
ALTER TABLE "public"."Brand" ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "primaryColor" TEXT,
ADD COLUMN     "secondaryColor" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Africa/Kinshasa';

-- AlterTable
ALTER TABLE "public"."Channel" DROP COLUMN "token",
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "meta" JSONB,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "public"."Contact" ADD COLUMN     "attributes" JSONB,
ADD COLUMN     "consentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "unsubscribedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Content" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT;

-- AlterTable
ALTER TABLE "public"."Media" ADD COLUMN     "alt" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "width" INTEGER;

-- AlterTable
ALTER TABLE "public"."PublishLog" DROP COLUMN "channel",
ADD COLUMN     "contentChannelId" TEXT NOT NULL,
ADD COLUMN     "providerCode" TEXT,
ALTER COLUMN "contentId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."ContentChannel" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "body" TEXT,
    "mediaIds" TEXT[],
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "error" TEXT,

    CONSTRAINT "ContentChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContentChannel_status_scheduledAt_idx" ON "public"."ContentChannel"("status", "scheduledAt");

-- CreateIndex
CREATE UNIQUE INDEX "ContentChannel_contentId_channelId_key" ON "public"."ContentChannel"("contentId", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "public"."Brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_brandId_type_key" ON "public"."Channel"("brandId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_brandId_email_key" ON "public"."Contact"("brandId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_brandId_phone_key" ON "public"."Contact"("brandId", "phone");

-- CreateIndex
CREATE INDEX "PublishLog_contentChannelId_idx" ON "public"."PublishLog"("contentChannelId");

-- AddForeignKey
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Channel" ADD CONSTRAINT "Channel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Content" ADD CONSTRAINT "Content_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContentChannel" ADD CONSTRAINT "ContentChannel_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContentChannel" ADD CONSTRAINT "ContentChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "public"."Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PublishLog" ADD CONSTRAINT "PublishLog_contentChannelId_fkey" FOREIGN KEY ("contentChannelId") REFERENCES "public"."ContentChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PublishLog" ADD CONSTRAINT "PublishLog_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
