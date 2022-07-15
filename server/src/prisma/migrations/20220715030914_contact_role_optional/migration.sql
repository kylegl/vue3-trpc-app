-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "role" DROP NOT NULL;
