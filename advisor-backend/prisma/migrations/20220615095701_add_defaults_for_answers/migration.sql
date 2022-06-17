/*
  Warnings:

  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[answer,template_id]` on the table `PossibleAnswers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_roles_idx";

-- AlterTable
ALTER TABLE "PossibleAnswers" ALTER COLUMN "answer" SET DEFAULT E'New Answer',
ALTER COLUMN "answer_weight" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roles",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PossibleAnswers_answer_template_id_key" ON "PossibleAnswers"("answer", "template_id");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");
