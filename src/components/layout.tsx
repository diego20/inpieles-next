import Header from "./header";
import Sidenav from "./sidenav";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="flex flex-col md:flex-row">
    <Sidenav />
    <div className="flex w-full flex-col overflow-y-auto">
      <Header />
      {children}
    </div>
  </div>
);

export default Layout;
