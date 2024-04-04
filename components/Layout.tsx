import React, { FunctionComponent, ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import { UserAuthInfo } from "../typings/user";

interface LayoutProps {
  children: ReactNode;
  user?: UserAuthInfo;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, user }) => {
  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
