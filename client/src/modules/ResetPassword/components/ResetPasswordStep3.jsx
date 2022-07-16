import { Button, PasswordInput } from "@mantine/core";
import React from "react";
import { ArrowRight } from "tabler-icons-react";

const ResetPasswordStep3 = ({ isSmallScreen, setActiveStep }) => {
  return (
    <>
      <PasswordInput label="New Password" mb="md" required />
      <PasswordInput label="Confirm Password" mb="md" required />
      <Button
        rightIcon={<ArrowRight size={18} />}
        fullWidth={isSmallScreen}
        onClick={() => setActiveStep(1)}>
        Reset Password
      </Button>
    </>
  );
};

export default ResetPasswordStep3;
