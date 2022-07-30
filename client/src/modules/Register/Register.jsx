import { Box, Stepper, Text, useMantineTheme } from "@mantine/core";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import { APP_TITLE } from "../../constants/global.constants";
import { useStepperStyles } from "../../hooks/styles/Stepper.styles";
import RegisterStep1 from "./components/RegisterStep1";
import RegisterStep2 from "./components/RegisterStep2";
import RegisterStep3 from "./components/RegisterStep3";
import { RegistrationFormProvider } from "./context/RegistrationFormContext";

const Register = () => {
  const { breakpoints } = useMantineTheme();
  useDocumentTitle(`${APP_TITLE} | Create New Account`);
  const isSmallScreen = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  const [activeStep, setActiveStep] = useState(0);
  const { classes } = useStepperStyles();

  return (
    <RegistrationFormProvider>
      <AuthLayout>
        <Box px="xl" py="lg">
          <Text size="xl" mb="md">
            Create a new {APP_TITLE} Account
          </Text>
          <Stepper active={activeStep} classNames={classes}>
            <Stepper.Step
              label="Basic Details"
              description="Enter basic account details">
              <RegisterStep1
                setActiveStep={setActiveStep}
                isSmallScreen={isSmallScreen}
              />
            </Stepper.Step>
            <Stepper.Step
              label="Create Password"
              description="Let's secure your account">
              <RegisterStep2
                setActiveStep={setActiveStep}
                isSmallScreen={isSmallScreen}
              />
            </Stepper.Step>
            <Stepper.Step
              label="Verify Account"
              description="Verify your account">
              <RegisterStep3 isSmallScreen={isSmallScreen} />
            </Stepper.Step>
          </Stepper>
        </Box>
      </AuthLayout>
    </RegistrationFormProvider>
  );
};

export default Register;
