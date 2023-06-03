import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import type { ReactElement, ReactNode } from "react";
import AuthContextProvider from "src/contexts/AuthContextProvider";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   refetchOnWindowFocus: false, // default: true
    //   staleTime: 1 * 60 * 1000, // default: 0ms
    // },
  },
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{layout}</AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
};

export default MyApp;
