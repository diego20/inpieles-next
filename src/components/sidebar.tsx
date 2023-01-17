import Link from "next/link";
import { useState } from "react";
import InpielesLogo from "../assets/inpielesLogo";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
import SidebarItem from "./sidebarItem";

const Sidebar = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const setSidebarMinimized = () => {
    setIsSidebarMinimized((prevState) => !prevState);
  };

  const [collapseShow, setCollapseShow] = useState("hidden");

  return (
    <nav
      className={`z-2 relative flex flex-wrap items-center justify-between p-3 md:h-screen ${
        isSidebarMinimized ? "md:w-20" : "md:w-56"
      } border-r border-r-gray-200 transition-all duration-500 dark:border-gray-800 md:sticky md:left-0 md:top-0 md:bottom-0 md:flex-nowrap md:px-5 md:py-6`}
    >
      <div className="relative mx-auto flex w-full items-center justify-between md:min-h-full md:flex-col md:items-stretch">
        {/* Button - mobile*/}
        <button
          className="cursor-pointer rounded p-3 text-gray-800 md:hidden"
          type="button"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <Bars3Icon className="w-6" />
        </button>
        {/* Logo */}
        <Link className="flex w-full pl-4 md:mb-10 md:h-8 md:p-0" href="/">
          <div
            className={`flex  overflow-x-hidden transition-all ${
              isSidebarMinimized ? "ml-0 w-10" : "w-full"
            } `}
          >
            <div className="w-48 flex-shrink-0">
              <InpielesLogo
                colorClass="fill-current text-gray-900"
                customClasses="max-h-8"
              />
            </div>
          </div>
        </Link>
        {/* Sidebar contents - Desktop and mobile pop-up menu */}
        <div
          className={`z-2 absolute top-0 left-0 right-0 h-auto flex-1 items-center rounded shadow md:relative md:z-0 md:mt-4 md:flex md:flex-col md:items-stretch md:shadow-none ${collapseShow}`}
        >
          {/* Collapse header - mobile */}
          <div className="mb-4 md:hidden md:min-w-full">
            <div className="flex justify-end">
              <button
                type="button"
                className="cursor-pointer rounded p-3 text-gray-600 md:hidden"
                onClick={() => setCollapseShow("hidden")}
              >
                <XMarkIcon className="w-6" />
              </button>
            </div>
          </div>
          <div className={`mb-11`}>
            <SidebarItem
              redirectRoute="/"
              itemText="Dashboard"
              isSidebarMinimized={isSidebarMinimized}
            >
              <HomeIcon />
            </SidebarItem>
          </div>

          {/* Sección Producción */}
          <div id="seccion-produccion">
            <ul className="flex list-none flex-col gap-1 md:min-w-full ">
              <li>
                <SidebarItem
                  redirectRoute="/empleados"
                  itemText="Empleados"
                  isSidebarMinimized={isSidebarMinimized}
                >
                  <UsersIcon />
                </SidebarItem>
              </li>
              <li>
                <SidebarItem
                  redirectRoute="/produccion"
                  itemText="Producción"
                  isSidebarMinimized={isSidebarMinimized}
                >
                  <ClipboardDocumentListIcon />
                </SidebarItem>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button
        onClick={setSidebarMinimized}
        className={`z-2 absolute -right-5 bottom-6 hidden transform rounded-full border border-gray-100 bg-white p-2 shadow shadow-gray-300 transition-transform duration-500 hover:shadow-lg md:block
         ${isSidebarMinimized ? "rotate-180" : ""}`}
      >
        <ChevronDoubleLeftIcon className="w-5 text-gray-400" />
      </button>
    </nav>
  );
};

export default Sidebar;
