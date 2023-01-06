import { prisma } from "../src/server/db";

/**
 * Semilla para iniciar una BD muy básica para empezar a probar
 * Más detalles en readme file
 */
async function main() {
  const emp1 = await prisma.empleado.upsert({
    where: {
      idEmpleado: "",
    },
    create: {
      nombres: "Ana",
      apellidos: "Rocío",
      celular: "312-0989039",
      direccion: "Carrera 43 s # 12-22",
      eps: "Colsanitas",
      estado: "ACTIVO",
      fechaIngreso: new Date("2020-05-21"),
      fechaNacimiento: new Date("1984-02-11"),
      telefonoReferido: "300-4045499",
    },
    update: {},
  });
  const emp2 = await prisma.empleado.upsert({
    where: {
      idEmpleado: "",
    },
    create: {
      nombres: "Juan",
      apellidos: "Pérez",
      celular: "3130489039",
      direccion: "Calle 55 s # 12-22",
      eps: "Aliansalud",
      estado: "ACTIVO",
      fechaIngreso: new Date("2021-05-21"),
      fechaNacimiento: new Date("1994-02-11"),
      telefonoReferido: "3024045499",
    },
    update: {},
  });
  const emp3 = await prisma.empleado.upsert({
    where: {
      idEmpleado: "",
    },
    create: {
      nombres: "Ricky",
      apellidos: "Peña",
      celular: "3190989039",
      direccion: "Calle 15 # 10-22",
      eps: "Aliansalud",
      estado: "ACTIVO",
      fechaIngreso: new Date("2021-01-21"),
      fechaNacimiento: new Date("1991-12-11"),
      telefonoReferido: "3024011499",
    },
    update: {},
  });
  const prod1 = await prisma.producto.upsert({
    where: {
      nombre: "Hueso 2-3",
    },
    create: {
      nombre: "Hueso 2-3",
      tamano: "2-3",
      peso: "50gr",
      puntos: 6,
    },
    update: {},
  });
  const prod2 = await prisma.producto.upsert({
    where: {
      nombre: "Hueso 3-4",
    },
    create: {
      nombre: "Hueso 3-4",
      tamano: "3-4",
      peso: "60gr",
      puntos: 7,
    },
    update: {},
  });
  const prod3 = await prisma.producto.upsert({
    where: {
      nombre: "Hueso 5-6",
    },
    create: {
      nombre: "Hueso 5-6",
      tamano: "4-5",
      peso: "70gr",
      puntos: 8,
    },
    update: {},
  });
  await prisma.produccion.upsert({
    where: {
      idProduccion: "",
    },
    create: {
      fecha: new Date(),
      loteMateriaPrima: new Date("2023-01-04"),
      cantidad: 100,
      empleado: {
        connect: {
          idEmpleado: emp1.idEmpleado,
        },
      },
      producto: {
        connect: {
          idProducto: prod1.idProducto,
        },
      },
    },
    update: {},
  });
  await prisma.produccion.upsert({
    where: {
      idProduccion: "",
    },
    create: {
      fecha: new Date(),
      loteMateriaPrima: new Date("2022-12-14"),
      cantidad: 90,
      empleado: {
        connect: {
          idEmpleado: emp2.idEmpleado,
        },
      },
      producto: {
        connect: {
          idProducto: prod2.idProducto,
        },
      },
    },
    update: {},
  });
  await prisma.produccion.upsert({
    where: {
      idProduccion: "",
    },
    create: {
      fecha: new Date(),
      loteMateriaPrima: new Date("2023-02-24"),
      cantidad: 94,
      empleado: {
        connect: {
          idEmpleado: emp3.idEmpleado,
        },
      },
      producto: {
        connect: {
          idProducto: prod3.idProducto,
        },
      },
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
