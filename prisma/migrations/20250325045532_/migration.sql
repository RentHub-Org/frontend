/*
  Warnings:

  - You are about to drop the column `rentralStatusId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `File` table. All the data in the column will be lost.
  - You are about to drop the `GatewayRoutes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatId` to the `TelegramEndPoints` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_createdFor_email_fkey";

-- DropForeignKey
ALTER TABLE "CreditUsage" DROP CONSTRAINT "CreditUsage_userAddr_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_createdBy_email_fkey";

-- DropForeignKey
ALTER TABLE "GatewayRoutes" DROP CONSTRAINT "GatewayRoutes_createdBy_email_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "rentralStatusId",
DROP COLUMN "size",
ADD COLUMN     "rentalStatus" TEXT,
ADD COLUMN     "workedBy" TEXT,
ALTER COLUMN "hash" DROP NOT NULL,
ALTER COLUMN "sessionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TelegramEndPoints" ADD COLUMN     "chatId" TEXT NOT NULL;

-- DropTable
DROP TABLE "GatewayRoutes";

-- DropEnum
DROP TYPE "FileType";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_createdBy_email_fkey" FOREIGN KEY ("createdBy_email") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_createdFor_email_fkey" FOREIGN KEY ("createdFor_email") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditUsage" ADD CONSTRAINT "CreditUsage_userAddr_fkey" FOREIGN KEY ("userAddr") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
