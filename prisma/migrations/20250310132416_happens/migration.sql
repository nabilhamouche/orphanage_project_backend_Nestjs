-- DropForeignKey
ALTER TABLE "Orphan" DROP CONSTRAINT "Orphan_orphanageId_fkey";

-- DropForeignKey
ALTER TABLE "adoption_applications" DROP CONSTRAINT "adoption_applications_adopterId_fkey";

-- AddForeignKey
ALTER TABLE "adoption_applications" ADD CONSTRAINT "adoption_applications_adopterId_fkey" FOREIGN KEY ("adopterId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orphan" ADD CONSTRAINT "Orphan_orphanageId_fkey" FOREIGN KEY ("orphanageId") REFERENCES "orphanages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
