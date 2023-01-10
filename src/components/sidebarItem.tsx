import Link from "next/link";

type Props = {
  urlLocation: string;
  redirectRoute: string;
  itemText: string;
  children: React.ReactNode;
  isSidebarMinimized: boolean;
};

/**
 * Componente de un item del sidebar.
 * @param urlLocation Ubicación actual del usuario en la página
 * @param redirectRoute Ruta a la que redirigir
 * @param itemText Texto que llevará el item
 * @param children Ícono que acompañará el item
 * @param isSidebarMinimized Si el sidebar está minimizado para ajustar el item
 * @returns Retorna un componente de React para ser renderizado
 */
function SidebarItem({
  urlLocation,
  redirectRoute,
  itemText,
  children,
  isSidebarMinimized,
}: Props) {
  return (
    <div
      className={`rounded-md text-gray-600 ${
        urlLocation.includes(redirectRoute)
          ? "bg-gray-200 text-gray-800"
          : "hover:bg-gray-100"
      }`}
    >
      <Link
        className={`relative ml-0 inline-flex items-center gap-3 py-3 pl-2 pr-3 text-sm font-bold`}
        href={redirectRoute}
      >
        <div className="w-6 flex-shrink-0">{children}</div>
        <span
          className={`transition-opacity ${
            isSidebarMinimized ? "opacity-0" : "opacity-100"
          }`}
        >
          {" "}
          {itemText}{" "}
        </span>
      </Link>
    </div>
  );
}

export default SidebarItem;
