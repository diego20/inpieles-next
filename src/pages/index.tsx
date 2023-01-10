import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inpieles SAS ERP</title>
        <meta name="description" content="ERP de Inpieles SAS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full grow">
        <div>
          <p>Empleados</p>
        </div>
      </main>
    </>
  );
};

export default Home;
