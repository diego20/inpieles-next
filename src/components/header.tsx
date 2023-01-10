import { SunIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="mx-4 flex h-16 items-center justify-end border-b bg-white ">
      <span className="rounded p-2 hover:bg-gray-100">
        <SunIcon className="w-6" />
      </span>
    </header>
  );
};

export default Header;
