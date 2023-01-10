import { SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="mx-4 flex h-16 items-center justify-end border-b border-b-gray-200 dark:border-b-gray-800">
      <span
        className="rounded p-2 hover:bg-gray-100 hover:text-gray-800"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="w-6" />
      </span>
    </header>
  );
};

export default Header;
