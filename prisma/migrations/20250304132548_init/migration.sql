-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Normal', 'ADMIN', 'ORPHANAGE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orphanage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Orphanage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orphan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "orphanageId" TEXT NOT NULL,

    CONSTRAINT "Orphan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Orphanage_userId_key" ON "Orphanage"("userId");

-- AddForeignKey
ALTER TABLE "Orphanage" ADD CONSTRAINT "Orphanage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orphan" ADD CONSTRAINT "Orphan_orphanageId_fkey" FOREIGN KEY ("orphanageId") REFERENCES "Orphanage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
