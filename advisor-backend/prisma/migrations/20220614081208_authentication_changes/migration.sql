/*
  Warnings:

  - You are about to drop the column `role` on the `AssessmentParticipants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category_name,template_id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssessmentParticipants" DROP COLUMN "role";

-- AlterTable
ALTER COLUMN "category_name" SET DEFAULT E'New Category',
ALTER COLUMN "color" SET DEFAULT E'#FF0000',
ALTER COLUMN "color" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_template_id_key" ON "Category"("category_name", "template_id");
