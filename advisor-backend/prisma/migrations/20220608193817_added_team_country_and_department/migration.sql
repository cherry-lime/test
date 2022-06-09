/*
  Warnings:

  - Added the required column `team_country` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_department` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "team_country" TEXT NOT NULL,
ADD COLUMN     "team_department" TEXT NOT NULL;
