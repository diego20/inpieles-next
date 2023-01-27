-- DropForeignKey
ALTER TABLE `Produccion` DROP FOREIGN KEY `Produccion_empleadoId_fkey`;

-- DropForeignKey
ALTER TABLE `Produccion` DROP FOREIGN KEY `Produccion_productoId_fkey`;

-- RenameIndex
ALTER TABLE `Produccion` RENAME INDEX `Produccion_empleadoId_fkey` TO `Produccion_empleadoId_idx`;

-- RenameIndex
ALTER TABLE `Produccion` RENAME INDEX `Produccion_productoId_fkey` TO `Produccion_productoId_idx`;
