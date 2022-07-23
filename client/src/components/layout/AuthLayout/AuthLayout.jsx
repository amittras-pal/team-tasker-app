import { Center, Container } from "@mantine/core";
import React from "react";
import { authLayoutStyle } from "./AuthLayout.styles";

// Component to serve as a layout for all 3 authentication related pages.
const AuthLayout = ({ children }) => {
  const { classes } = authLayoutStyle();
  return (
    <Center className={classes.wrapper}>
      <Container size="md" className={classes.container} mx="md">
        {children}
      </Container>
    </Center>
  );
};

export default AuthLayout;
