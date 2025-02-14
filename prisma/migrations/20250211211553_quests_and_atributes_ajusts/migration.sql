/*
  Warnings:

  - Added the required column `userId` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterStats" ADD COLUMN     "maxHp" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "maxMp" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "xpToNextLevel" INTEGER NOT NULL DEFAULT 1000;

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
