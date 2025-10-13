import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Footer from "../pages/Footer";

const Layout = ({ children }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
