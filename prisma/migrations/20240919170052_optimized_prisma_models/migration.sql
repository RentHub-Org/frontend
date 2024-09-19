/*
  Warnings:

  - You are about to drop the column `userId` on the `CreditUsage` table. All the data in the column will be lost.
  - Added the required column `userAddr` to the `CreditUsage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_createdFor_email_fkey";

-- DropForeignKey
ALTER TABLE "CreditUsage" DROP CONSTRAINT "CreditUsage_userId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_createdBy_email_fkey";

-- AlterTable
ALTER TABLE "CreditUsage" DROP COLUMN "userId",
ADD COLUMN     "userAddr" TEXT NOT NULL,
ALTER COLUMN "credits" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_createdBy_email_fkey" FOREIGN KEY ("createdBy_email") REFERENCES "User"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_createdFor_email_fkey" FOREIGN KEY ("createdFor_email") REFERENCES "User"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditUsage" ADD CONSTRAINT "CreditUsage_userAddr_fkey" FOREIGN KEY ("userAddr") REFERENCES "User"("address") ON DELETE CASCADE ON UPDATE CASCADE;
