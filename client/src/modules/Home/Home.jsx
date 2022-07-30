import { Box } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useHomeStyles } from "./Home.styles";

const Home = () => {
  const {
    classes: { wrapper, body },
  } = useHomeStyles();

  return (
    <Box className={wrapper}>
      <Header />
      <Box className={body}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
