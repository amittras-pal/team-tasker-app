import {
  Box,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "tabler-icons-react";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import { APP_TITLE } from "../../constants/global.constants";

const Login = () => {
  const { breakpoints } = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  return (
    <AuthLayout loading={false}>
      <Box px="xl" py="lg" component="form">
        <Text size="xl" mb="md">
          Login to your {APP_TITLE} account
        </Text>
        <TextInput label="Email Address" required autoFocus />
        <PasswordInput label="Password" required />
        <Group align="center" position="apart" mb={8}>
          <Button
            rightIcon={<ArrowRight size={18} />}
            fullWidth={isSmallScreen}>
            Login
          </Button>
          <Text component="p" my={0}>
            <Text component="span">New to {APP_TITLE}? </Text>
            <Text component={Link} to="/register" weight="bold" color="blue">
              Create account.
            </Text>
          </Text>
        </Group>
        <Text component={Link} to="/reset-password" weight="bold" color="blue">
          Forgot Password!
        </Text>
      </Box>
    </AuthLayout>
  );
};

export default Login;
