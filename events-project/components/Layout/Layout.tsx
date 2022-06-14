import { FC } from "react";
import MainHeader from "./MainHeader";

const Layout: FC = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
