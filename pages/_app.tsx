import {
  QueryClient,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";

import "@/styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { GetServerSidePropsContext } from "next";

export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(() => new QueryClient());

  const path = usePathname();
  const hideLayout =
    [/\/login*/, /\/auth*/].findIndex((p) => path.match(p)) === -1;

  return (
    <>
      <QueryClientProvider client={client}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <RecoilRoot>
            {hideLayout && <Header />}
            <Component {...pageProps} />
            {hideLayout && <Footer />}
          </RecoilRoot>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}

export function getServerSideProps(cx: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
