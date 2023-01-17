import Header from "./header";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="flex flex-col bg-white transition-colors dark:bg-gray-700 md:flex-row">
    <Sidebar />
    <div className="flex w-full flex-col overflow-y-auto">
      <Header />
      <main className="mx-4 h-full grow pt-4">{children}</main>
    </div>
  </div>
);

export default Layout;
