/*
  Warnings:

  - You are about to drop the column `roley` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "roley",
ADD COLUMN     "role" TEXT;
