-- AlterTable
ALTER TABLE "public"."Brand" ADD COLUMN     "forbidden" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "ctas" SET DEFAULT ARRAY[]::TEXT[];
