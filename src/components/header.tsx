import { ArrowLeftIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Button } from "./reusable-components/button";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <header className="mb-4 flex h-16 items-center justify-between border-b border-b-gray-200 dark:border-b-gray-800">
      {router.pathname !== "/" ? (
        <Button variant={"ghost"} hasIcon={true} onClick={() => router.back()}>
          <ArrowLeftIcon className="w-6" />
          <p>Atrás</p>
        </Button>
      ) : (
        <span></span>
      )}
      <Button
        variant={"subtle"}
        className="bg-blue-50"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="w-6 text-blue-500" />
      </Button>
    </header>
  );
};

export default Header;
