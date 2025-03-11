-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "checkpoit" INTEGER NOT NULL DEFAULT 0,
    "finalpoint" INTEGER NOT NULL DEFAULT 1,
    "questId" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
