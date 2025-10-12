import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "../pages/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
