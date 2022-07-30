import { Box } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthProvider from "./context/AuthContext";
import { useHomeStyles } from "./Home.styles";

const Home = () => {
  const {
    classes: { wrapper, body },
  } = useHomeStyles();

  return (
    <AuthProvider>
      <Box className={wrapper}>
        <Header />
        <Box className={body}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </AuthProvider>
  );
};

export default Home;
