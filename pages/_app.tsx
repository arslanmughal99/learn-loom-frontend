import {
  QueryClient,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";


import "@/styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";


export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(() => new QueryClient());

  const path = usePathname();
  const hideLayout = path
    ? [
        /\/auth*/,
        /\/login*/,
        /certificate\/\w*/,
        /student\/learning\/\d+/,
      ].findIndex((p) => path.match(p)) === -1
    : false;

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
        <Toaster closeButton richColors />
      </QueryClientProvider>
    </>
  );
}
