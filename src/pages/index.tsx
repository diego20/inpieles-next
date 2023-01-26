import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inpieles SAS ERP</title>
        <meta name="description" content="ERP de Inpieles SAS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        <div className="flex gap-5">
          <Link href={"/empleados"}>
            <div className="flex h-32 items-center justify-center rounded bg-gray-100 p-9 font-bold">
              <h1 className="text-gray-900">Empleados</h1>
            </div>
          </Link>
          <Link href={"/produccion"}>
            <div className="flex h-32 items-center justify-center rounded bg-gray-100 p-9 font-bold">
              <h1 className="text-gray-900">Producción</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
