import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Navbar username={user.username} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
