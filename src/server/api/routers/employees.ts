import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const EstadoEnum = ["ACTIVO", "DESPEDIDO", "RENUNCIADO", "AUSENTE"] as const;

const EmpleadoDTO = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  fechaNacimiento: z.coerce.date(),
  fechaIngreso: z.coerce.date(),
  celular: z.coerce.string(),
  email: z.string().email(),
  cedula: z.coerce.string().max(10),
  telefonoReferido: z.coerce.string(),
  direccion: z.string(),
  eps: z.string(),
  estado: z.enum(EstadoEnum),
});

export const employeesRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.empleado.findFirst({
      where: {
        idEmpleado: input,
      },
    });
  }),

  getbyCedula: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.empleado.findFirst({
      where: {
        cedula: input,
      },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.empleado.findMany();
  }),

  addOrUpdateEmployee: publicProcedure
    .input(EmpleadoDTO)
    .mutation(({ ctx, input }) => {
      console.log("Entramos");
      return ctx.prisma.empleado.upsert({
        where: { email: input.email },
        update: { ...input },
        create: { ...input },
      });
    }),

  removeEmployee: publicProcedure
    .input(EmpleadoDTO)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.empleado.delete({
        where: { email: input.email },
      });
    }),
});
