import Header from "./header";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="flex flex-col bg-white transition-colors dark:bg-gray-900 md:flex-row">
    <Sidebar />
    <div className="flex min-h-screen w-full flex-col overflow-y-auto px-6">
      <Header />
      <main className="h-full grow py-4">{children}</main>
    </div>
  </div>
);

export default Layout;
