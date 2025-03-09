/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `orphanages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orphanages_ownerId_key" ON "orphanages"("ownerId");
