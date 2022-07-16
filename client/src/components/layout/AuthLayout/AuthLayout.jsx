import { Center, Container, LoadingOverlay } from "@mantine/core";
import React from "react";
import { authLayoutStyle } from "./AuthLayout.styles";

// Component to serve as a layout for all 3 authentication related pages.
const AuthLayout = ({ children, loading = false }) => {
  const { classes } = authLayoutStyle();
  return (
    <Center className={classes.wrapper}>
      <Container size="md" className={classes.container} mx="md">
        <LoadingOverlay visible={loading} className={classes.loadingOverlay} />
        {children}
      </Container>
    </Center>
  );
};

export default AuthLayout;
