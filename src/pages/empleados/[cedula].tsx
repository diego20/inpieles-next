import { useRouter } from "next/router";
import { api } from "../../utils/api";

const Empleado = () => {
  const router = useRouter();
  const { cedula } = router.query;
  const empleado = api.empleados.getbyCedula.useQuery(cedula as string, {
    enabled: !!cedula,
    staleTime: Infinity,
  });

  return (
    empleado && (
      <div>Esta es mi cédula del empleado {JSON.stringify(empleado.data)}</div>
    )
  );
};

export default Empleado;
