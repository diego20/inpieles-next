import type { NextPage } from "next";
import { api } from "../utils/api";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../components/reusable-components/input";

const Empleados: NextPage = () => {
  const {
    data: empleados,
    isLoading,
    isSuccess,
  } = api.empleados.getAll.useQuery(undefined, {
    refetchOnMount: "always",
    staleTime: Infinity,
  });
  const [filteredEmployees, setFilteredEmployees] = useState(empleados);
  useEffect(() => {
    setFilteredEmployees(empleados);
  }, [empleados]);

  const filterEmployees = (query: string) => {
    if (empleados) {
      setFilteredEmployees(
        empleados.filter((employee) =>
          employee.nombres.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="">
      <h1 className="mb-8 text-3xl">Empleados</h1>
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="mb-4 flex justify-between">
        <Input
          onChange={(e) => filterEmployees(e.target.value)}
          type="search"
          id="table-search"
          placeholder="Buscar por nombre"
          icon={<MagnifyingGlassIcon className="w-5" />}
          className={"w-80"}
        ></Input>
        <Link href={"/empleados/nuevo"} className={"icon-and-link-styles"}>
          <PlusIcon className="w-4" />
          Agregar empleado
        </Link>
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : isSuccess ? (
        <div className="relative overflow-x-auto border border-gray-50 shadow-md dark:border-gray-600 sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Cédula
                </th>
                <th scope="col" className="px-6 py-3">
                  Correo
                </th>
                <th scope="col" className="px-6 py-3">
                  Celular
                </th>
                <th scope="col" className="px-6 py-3">
                  EPS
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
              </tr>
            </thead>
            {filteredEmployees && (
              <tbody>
                {filteredEmployees.map((empleado) => (
                  <tr
                    key={empleado.idEmpleado}
                    className=" border-b bg-white last:border-b-0 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
                    // onClick={() => router.push(`/empleados/${empleado.cedula}`)}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                      <Link
                        className="block px-6 py-4"
                        href={`/empleados/${empleado.cedula}`}
                      >
                        {empleado.nombres} {empleado.apellidos}
                      </Link>
                    </th>
                    <td>
                      <Link
                        className="block px-6 py-4"
                        href={`/empleados/${empleado.cedula}`}
                      >
                        {empleado.cedula}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="block px-6 py-4"
                        href={`/empleados/${empleado.cedula}`}
                      >
                        {empleado.email}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="block px-6 py-4"
                        href={`/empleados/${empleado.cedula}`}
                      >
                        {empleado.celular}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="block px-6 py-4"
                        href={`/empleados/${empleado.cedula}`}
                      >
                        {empleado.eps}
                      </Link>
                    </td>
                    <td
                      className={`${
                        empleado.estado === "ACTIVO" ? "text-green-700" : ""
                      }`}
                    >
                      <Link
                        className="block px-6 py-4"
                        href={`/empleados/${empleado.cedula}`}
                      >
                        {empleado.estado}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      ) : (
        <p>Ha ocurrido un error</p>
      )}
    </div>
  );
};

export default Empleados;
