import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { Button } from "../../components/reusable-components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../../components/reusable-components/modal";
import { Input } from "../../components/reusable-components/input";

type Inputs = {
  nombres: string;
  apellidos: string;
  email: string;
  cedula: number | string;
  fechaNacimiento: string;
  celular: number | string;
  fechaIngreso: string;
  telefonoReferido: number | string;
  direccion: string;
  eps: string;
  estado: "ACTIVO" | "DESPEDIDO" | "RENUNCIADO" | "AUSENTE";
};

const Empleado = () => {
  const router = useRouter();
  const { cedula } = router.query;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const { data, isLoading } = api.empleados.getbyCedula.useQuery(
    cedula as string,
    {
      enabled: !!cedula,
      refetchOnMount: "always",
      staleTime: Infinity,
      onSuccess: (cb) =>
        cb &&
        reset({
          ...cb,
          fechaIngreso: cb.fechaIngreso.toISOString().split("T")[0],
          fechaNacimiento: cb.fechaNacimiento.toISOString().split("T")[0],
        }),
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateMutation = api.empleados.addOrUpdateEmployee.useMutation();
  const removeMutation = api.empleados.removeByCedula.useMutation();

  const resetForm = () => {
    console.log("form resetted");
    // reset();
    setIsModalOpen(false);
  };

  /**
   * Envia info que pasó los checks al backend
   * @param data Data a enviar al BE
   */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("mutado");
      const mutado = {
        ...data,
        celular: data.celular.toString(),
        cedula: data.cedula.toString(),
        telefonoReferido: data.telefonoReferido.toString(),
        fechaNacimiento: new Date(data.fechaNacimiento),
        fechaIngreso: new Date(data.fechaIngreso),
      };
      updateMutation.mutate(mutado, {
        onSuccess() {
          setIsModalOpen(true);
        },
        onError(error) {
          console.log("Error trayendo data", error.message);
        },
      });
    } catch (e) {
      if (typeof e === "string") {
        throw new Error(`Algo está muy mal, ${e}`);
      } else if (e instanceof Error) {
        throw new Error(`Algo está muy mal, ${e.message}`);
      } else throw new Error("Algo está muy mal, no se definió tipo de error");
    }
  };

  const removeEmployee = () => {
    if (data) {
      removeMutation.mutate(data.email, {
        onSuccess() {
          router.back();
        },
      });
    }
  };

  return isLoading ? (
    <p>Cargando...</p>
  ) : (
    <div>
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl">Editar</h1>
        <Button variant={"destructive"} type="button" onClick={removeEmployee}>
          Eliminar empleado
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 grid max-w-5xl grid-cols-1 gap-y-6 gap-x-10 md:grid-cols-2">
          <div>
            <label
              htmlFor="nombres"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombres
            </label>
            <Input
              type={"text"}
              id="nombres"
              className={`${
                errors.nombres
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("nombres", { required: true })}
            />
            {errors.nombres && (
              <span className="text-xs text-red-500">
                Nombre es obligatorio
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="apellidos"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Apellidos
            </label>
            <Input
              type={"text"}
              id="apellidos"
              className={`${
                errors.apellidos
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("apellidos", { required: true })}
            />
            {errors.apellidos && (
              <span className="text-xs text-red-500">
                Apellido es obligatorio
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <Input
              type={"email"}
              id="email"
              className={`${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">email es obligatorio</span>
            )}
          </div>
          <div>
            <label
              htmlFor="cedula"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Cédula
            </label>
            <Input
              type={"number"}
              id="cedula"
              className={`${
                errors.cedula
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("cedula", {
                required: true,
                minLength: {
                  value: 7,
                  message: "Debe tener al menos 7 dígitos",
                },
                maxLength: {
                  value: 10,
                  message: "No puede tener más de 10 dígitos",
                },
              })}
            />
            {errors.cedula && (
              <span className="text-xs text-red-500">
                {errors.cedula.message || "Cédula es obligatoria"}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="fechaNacimiento"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Fecha nacimiento
            </label>
            <Input
              type={"date"}
              id="fechaNacimiento"
              className={`${
                errors.fechaNacimiento
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("fechaNacimiento", { required: true })}
            />
            {errors.fechaNacimiento && (
              <span className="text-xs text-red-500">
                Fecha de nacimiento es obligatoria
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="celular"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Celular
            </label>
            <Input
              type={"number"}
              id="celular"
              className={`${
                errors.celular
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("celular", {
                required: true,
                minLength: {
                  value: 7,
                  message: "El celular no puede tener menos de 7 dígitos",
                },
                maxLength: {
                  value: 12,
                  message: "El celular no puede tener más de 12 dígitos",
                },
              })}
            />
            {errors.celular && (
              <span className="text-xs text-red-500">
                {errors.celular.message || "El número celular es obligatorio"}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="fechaIngreso"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Fecha de ingreso
            </label>
            <Input
              type={"date"}
              id="fechaIngreso"
              className={`${
                errors.fechaIngreso
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("fechaIngreso", { required: true })}
            />
            {errors.fechaIngreso && (
              <span className="text-xs text-red-500">
                Fecha de ingreso es obligatoria
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="telefonoReferido"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Teléfono referido
            </label>
            <Input
              type={"number"}
              id="telefonoReferido"
              className={`${
                errors.telefonoReferido
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("telefonoReferido", { required: true })}
            />
            {errors.telefonoReferido && (
              <span className="text-xs text-red-500">
                Teléfono de referido es obligatorio
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="direccion"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Dirección residencia
            </label>
            <Input
              type={"text"}
              id="direccion"
              className={`${
                errors.direccion
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("direccion", { required: true })}
            />
            {errors.direccion && (
              <span className="text-xs text-red-500">
                Dirección de residencia es obligatoria
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="eps"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              EPS
            </label>
            <Input
              type={"text"}
              id="eps"
              className={`${
                errors.eps
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("eps", { required: true })}
            />
            {errors.eps && (
              <span className="text-xs text-red-500">EPS es obligatoria</span>
            )}
          </div>
          <div>
            <label
              htmlFor="estado"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Estado
            </label>
            <select
              id="estado"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                errors.estado
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              {...register("estado", { required: true })}
            >
              <option value={"ACTIVO"}>Activo</option>
              <option value={"DESPEDIDO"}>Despedido</option>
              <option value={"RENUNCIADO"}>Renunciado</option>
              <option value={"AUSENTE"}>Austente</option>
            </select>
            {errors.estado && (
              <span className="text-xs text-red-500">
                El estado es obligatorio
              </span>
            )}
          </div>
        </div>
        <div className="mb-4 flex items-center gap-3">
          <Button type="submit" className="px-8">
            Actualizar
          </Button>
          <Button
            variant={"outline"}
            type="submit"
            className="px-8"
            onClick={() => router.back()}
          >
            Regresar
          </Button>
        </div>

        {/* Modal */}
        <Dialog
          open={isModalOpen}
          onOpenChange={(modalState) => !modalState && resetForm()}
        >
          <DialogContent className="gap-8 sm:max-w-sm">
            <DialogHeader>
              <CheckCircleIcon className="m-auto mb-3 inline-block w-16 text-green-700" />
              <DialogDescription className="text-center">
                Se ha actualizado al empleado exitosamente
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={resetForm}>
                Continuar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
};

export default Empleado;
