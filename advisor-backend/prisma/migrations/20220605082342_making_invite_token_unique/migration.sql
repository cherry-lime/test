/*
  Warnings:

  - A unique constraint covering the columns `[invite_token]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team_invite_token_key" ON "Team"("invite_token");
