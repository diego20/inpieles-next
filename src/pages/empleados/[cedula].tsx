import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";

type Inputs = {
  nombres: string;
  apellidos: string;
  email: string;
  cedula: number | string;
  fechaNacimiento: Date;
  celular: number | string;
  fechaIngreso: Date;
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
    formState: { errors, isSubmitted },
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Enviar info exitosa al back
    try {
      console.log("mutado");
      const mutado = {
        ...data,
        celular: data.celular.toString(),
        cedula: data.cedula.toString(),
        telefonoReferido: data.telefonoReferido.toString(),
      };
      updateMutation.mutate(mutado, {
        onSuccess() {
          setIsModalOpen(true);
        },
        onError(error) {
          console.log("Error trayendo data", error.message);
        },
      });
    } catch (e: any) {
      throw new Error("Algo está muy mal", e);
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
        <button
          type="button"
          className="mr-2 mb-2 rounded-lg bg-red-700 px-8 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={removeEmployee}
        >
          Eliminar empleado
        </button>
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
            <input
              type="text"
              id="nombres"
              className={`dark:focus:ring-blue-500" block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
                errors.nombres
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }
               dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500`}
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
            <input
              type="text"
              id="apellidos"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
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
            <input
              type="email"
              id="email"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
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
            <input
              type="number"
              id="cedula"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
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
            <input
              type="date"
              id="fechaNacimiento"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
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
            <input
              type="number"
              id="celular"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
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
            <input
              type="date"
              id="fechaIngreso"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
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
            <input
              type="number"
              id="telefonoReferido"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                errors.telefonoReferido
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }
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
            <input
              type="text"
              id="direccion"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
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
            <input
              type="text"
              id="eps"
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
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
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-8 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Actualizar
          </button>
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            onClick={() => router.back()}
          >
            Regresar
          </button>
        </div>

        {isModalOpen && (
          <div
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-500/25 p-4 md:inset-0 md:h-full"
            onClick={() => resetForm()}
          >
            <div
              className="relative mx-auto h-full w-full max-w-md md:h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mt-24 rounded-lg bg-white shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={resetForm}
                >
                  <XMarkIcon className="w-4" />
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <CheckCircleIcon className="mb-3 inline-block w-16 text-green-700" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Se ha modificado al empleado exitosamente
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="w-full rounded-lg bg-blue-700 px-8 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                    onClick={resetForm}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Empleado;
