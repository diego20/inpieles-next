import { ArrowLeftIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <header className="mx-4 mb-4 flex h-16 items-center justify-between border-b border-b-gray-200 dark:border-b-gray-800">
      {router.pathname !== "/" ? (
        <button
          className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="w-6" />
          <p>Atrás</p>
        </button>
      ) : (
        <span></span>
      )}
      <button
        className="rounded p-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="w-6" />
      </button>
    </header>
  );
};

export default Header;
