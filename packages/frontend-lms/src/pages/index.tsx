import { type NextPage } from "next";
import Header from "src/components/layouts/Header";
import { useAuthContext } from "../lib/auth_client";
import Login from "./auth/login-page";
import Announcement from "./announcements";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "src/components/Loading";

const Home: NextPage = ({ data }: any) => {
  const router: any = useRouter();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [queryPath, setQueryPath] = useState("");

  //---------------------------------------------------------------
  // Loading, save old selection when F5
  React.useEffect(() => {
    setIsLoading(true);

    setQueryPath(router?.query?.web);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };

  }, [router?.query?.web]);

  //---------------------------------------------------------------
  const handleChangeWeb = (e: any) => {
    e.preventDefault();
    let url = e.target.value;
    setIsLoading(true);
    setQueryPath(url);
    router.push(`/?web=${url}`);
    setIsLoading(false);
  };

  //---------------------------------------------------------------
  return !user ? (
    <Login />
  ) : (
    <React.Fragment>
      <Header />
      <div className="h-screen bg-slate-200 p-8 px-[8vw] py-11">
        <article className="mb-8 rounded-lg bg-white px-8 py-8">
          <div className="mb-6 flex justify-between border-b border-gray-400 pb-6 text-xl font-semibold leading-8 text-gray-600">
            <h2>Announcement</h2>
            {/* <p className="text-2xl"> Announcement </p> */}
            <select value={queryPath} onChange={handleChangeWeb}>
              <option value="edu">Edusoft Web</option>
              <option value="it_hcmiu">IT Department</option>
              <option value="iuoss">IUOSS</option>
            </select>
          </div>
          {/* <p className="w-full border-2"></p> */}
          {!isLoading ? <Announcement data={data} /> : <Loading />}
        </article>
      </div>
    </React.Fragment>
  );
};

//-----------------------------------------------------------------
export const getServerSideProps = async (context: any) => {
  const { web = "edu" } = context.query;
  const resCrawler = await fetch(`http://localhost:5999?web=${web}`);
  const data = await resCrawler.json();
  return { props: { data } };
};

export default Home;
