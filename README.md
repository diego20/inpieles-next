# Inpieles App creada con Create T3 App

## Prisma y BD

Iniciar de cero:

1. Actualizar .env para conexión a la BD.
2. Ejectutar `npx prisma migrate dev --name *commit msj*` para crear el esquema en una DB.
3. Ejecutar `npm run db-seed` para poblar muy básicamente algunos datos en la DB del archivo `prisma/seed.ts` y empezar a probar cosas.

- Ejecutar `npx prisma generate` cada vez que se actualice el esquema para actualizar los TS types en el proyecto.
