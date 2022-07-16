import { Button, Group, PasswordInput, Text, TextInput } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "tabler-icons-react";

const RegisterStep1 = ({ isSmallScreen, setActiveStep }) => {
  return (
    <>
      <TextInput label="Your Full Name" required autoFocus />
      <TextInput label="Email Address" required />
      <PasswordInput label="Password" required />
      <PasswordInput label="Confirm Password" required />
      <Group align="center" position="apart">
        <Button
          rightIcon={<ArrowRight size={18} />}
          fullWidth={isSmallScreen}
          onClick={() => setActiveStep(1)}>
          Create Account
        </Button>
        <Text component="p" my={0}>
          <Text component="span">Already have an account? </Text>
          <Text component={Link} to="/login" weight="bold" color="blue">
            Login Instead.
          </Text>
        </Text>
      </Group>
    </>
  );
};

export default RegisterStep1;
