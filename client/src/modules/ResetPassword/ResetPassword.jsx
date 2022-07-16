import { Box, Stepper, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import { useStepperStyles } from "../../hooks/styles/Stepper.styles";
import ResetPasswordStep1 from "./components/ResetPasswordStep1";
import ResetPasswordStep2 from "./components/ResetPasswordStep2";
import ResetPasswordStep3 from "./components/ResetPasswordStep3";
import { APP_TITLE } from "../../constants/global.constants";

const ResetPassword = () => {
  const { breakpoints } = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  const [activeStep, setActiveStep] = useState(0);
  const { classes } = useStepperStyles();

  return (
    <AuthLayout loading={false}>
      <Box px="xl" py="lg">
        <Text size="xl" mb="md">
          Reset your {APP_TITLE} account password
        </Text>
        <Stepper active={activeStep} classNames={classes}>
          <Stepper.Step label="Email Address" description="Find your account">
            <ResetPasswordStep1
              isSmallScreen={isSmallScreen}
              setActiveStep={setActiveStep}
            />
          </Stepper.Step>
          <Stepper.Step label="Verify Email" description="Verify it's you">
            <ResetPasswordStep2
              isSmallScreen={isSmallScreen}
              setActiveStep={setActiveStep}
            />
          </Stepper.Step>
          <Stepper.Step
            label="New Password"
            description="create a new password">
            <ResetPasswordStep3 />
          </Stepper.Step>
        </Stepper>
      </Box>
    </AuthLayout>
  );
};

export default ResetPassword;
