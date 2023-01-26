/*
  Warnings:

  - Made the column `cedula` on table `Empleado` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Empleado` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Empleado` MODIFY `cedula` VARCHAR(10) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;
