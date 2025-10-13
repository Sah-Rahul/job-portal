import React from "react";
import Home from "../components/Home";
import LatestJob from "./LatestJob";
import Layout from "../components/Layout";

const Hero = () => {
  return (
    <>
      <Layout>
        <Home />
        <LatestJob />
      </Layout>
    </>
  );
};

export default Hero;
