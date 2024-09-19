-- CreateEnum
CREATE TYPE "ListType" AS ENUM ('DEV', 'RENTAL');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('FILE', 'IMAGE', 'JSON', 'TEXT', 'CUSTOM');

-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,
    "credits" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "GatewayRoutes" (
    "route" TEXT NOT NULL,
    "createdBy_email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "sessionId" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "expires_in_days" INTEGER NOT NULL,
    "createdBy_email" TEXT NOT NULL,
    "rentralStatusId" TEXT NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listType" "ListType" NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bills" (
    "billId" TEXT NOT NULL,
    "txnHash" TEXT NOT NULL,
    "payableAmount" BIGINT NOT NULL,
    "createdFor_email" TEXT NOT NULL,
    "credits" BIGINT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("billId")
);

-- CreateTable
CREATE TABLE "TelegramEndPoints" (
    "username" TEXT NOT NULL,
    "nameHolder" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ApiKeys" (
    "key" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    "nameHolder" TEXT NOT NULL,

    CONSTRAINT "ApiKeys_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "CreditUsage" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GatewayRoutes_route_key" ON "GatewayRoutes"("route");

-- CreateIndex
CREATE UNIQUE INDEX "File_id_key" ON "File"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramEndPoints_username_key" ON "TelegramEndPoints"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKeys_tagName_key" ON "ApiKeys"("tagName");

-- AddForeignKey
ALTER TABLE "GatewayRoutes" ADD CONSTRAINT "GatewayRoutes_createdBy_email_fkey" FOREIGN KEY ("createdBy_email") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_createdBy_email_fkey" FOREIGN KEY ("createdBy_email") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_createdFor_email_fkey" FOREIGN KEY ("createdFor_email") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramEndPoints" ADD CONSTRAINT "TelegramEndPoints_nameHolder_fkey" FOREIGN KEY ("nameHolder") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKeys" ADD CONSTRAINT "ApiKeys_nameHolder_fkey" FOREIGN KEY ("nameHolder") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditUsage" ADD CONSTRAINT "CreditUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
