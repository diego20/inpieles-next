import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  redirectRoute: string;
  itemText: string;
  children: React.ReactNode;
  isSidebarMinimized: boolean;
};

/**
 * Componente de un item del sidebar.
 * @param redirectRoute Ruta a la que redirigir
 * @param itemText Texto que llevará el item
 * @param children Ícono que acompañará el item
 * @param isSidebarMinimized Si el sidebar está minimizado para ajustar el item
 * @returns Retorna un componente de React para ser renderizado
 */
function SidebarItem({
  redirectRoute,
  itemText,
  children,
  isSidebarMinimized,
}: Props) {
  const router = useRouter();

  const getShouldBeHighlighted = () => {
    if (router.pathname === "/") return router.pathname === redirectRoute;
    else if (redirectRoute.length > 1)
      return router.pathname.includes(redirectRoute);
  };

  const shouldBeHighlighted = getShouldBeHighlighted();
  return (
    <div
      className={`rounded-md dark:text-white ${
        shouldBeHighlighted
          ? "bg-gray-100 text-gray-600 dark:bg-gray-600"
          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600"
      }`}
    >
      <Link
        className={`relative ml-0 inline-flex w-full items-center gap-3 py-3 pl-2 pr-3 text-sm font-bold`}
        href={redirectRoute}
      >
        <div
          className={`w-6 flex-shrink-0 ${
            shouldBeHighlighted ? "text-blue-500" : ""
          }`}
        >
          {children}
        </div>
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
