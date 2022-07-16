import { Button, TextInput } from "@mantine/core";
import React from "react";
import { ArrowRight } from "tabler-icons-react";
import { APP_TITLE } from "../../../constants/global.constants";

const ResetPasswordStep1 = ({ isSmallScreen, setActiveStep }) => {
  return (
    <>
      <TextInput
        label="Email Address"
        description={`Enter the email address associated with your ${APP_TITLE} Account`}
        required
        autoFocus
      />
      <Button
        rightIcon={<ArrowRight size={18} />}
        fullWidth={isSmallScreen}
        onClick={() => setActiveStep(1)}>
        Continue
      </Button>
    </>
  );
};

export default ResetPasswordStep1;
