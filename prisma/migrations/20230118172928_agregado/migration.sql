/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Empleado` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Empleado` ADD COLUMN `cedula` VARCHAR(10) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Empleado_email_key` ON `Empleado`(`email`);
