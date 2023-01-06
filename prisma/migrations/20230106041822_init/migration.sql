-- CreateTable
CREATE TABLE `Empleado` (
    `idEmpleado` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `fechaIngreso` DATETIME(3) NOT NULL,
    `fechaSalida` DATETIME(3) NULL,
    `celular` INTEGER NOT NULL,
    `telefonoReferido` INTEGER NOT NULL,
    `telefonoCasa` INTEGER NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `eps` VARCHAR(191) NOT NULL,
    `estado` ENUM('ACTIVO', 'DESPEDIDO', 'RENUNCIADO', 'AUSENTE') NOT NULL,

    PRIMARY KEY (`idEmpleado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produccion` (
    `idProduccion` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `cantidad` INTEGER NULL,
    `loteMateriaPrima` DATETIME(3) NOT NULL,
    `empleadoId` VARCHAR(191) NOT NULL,
    `productoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idProduccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `idProducto` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `puntos` INTEGER NULL,
    `peso` VARCHAR(191) NULL,
    `tamano` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Producto_nombre_key`(`nombre`),
    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produccion` ADD CONSTRAINT `Produccion_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleado`(`idEmpleado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produccion` ADD CONSTRAINT `Produccion_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`idProducto`) ON DELETE RESTRICT ON UPDATE CASCADE;
