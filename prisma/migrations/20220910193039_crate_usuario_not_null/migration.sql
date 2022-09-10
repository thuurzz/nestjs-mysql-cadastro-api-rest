/*
  Warnings:

  - Made the column `name` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `name` VARCHAR(200) NOT NULL;
