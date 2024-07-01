-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'POSTER', 'VIEWER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'VIEWER';
