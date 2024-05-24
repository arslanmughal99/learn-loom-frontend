import React, { FunctionComponent, ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import { UserAuthInfo } from "../typings/user";

interface LayoutProps {
  children: ReactNode;
  user?: UserAuthInfo;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
