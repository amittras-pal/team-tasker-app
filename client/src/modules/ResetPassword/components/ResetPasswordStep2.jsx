import { Alert, Button, Group, TextInput } from "@mantine/core";
import React from "react";
import { ArrowRight, InfoCircle } from "tabler-icons-react";
import { CHECK_MAIL_FOR_CODE_ALERT } from "../../../constants/global.constants";

const ResetPasswordStep2 = ({ isSmallScreen, setActiveStep }) => {
  return (
    <>
      <Alert icon={<InfoCircle size={16} />} title="Account Verification">
        {CHECK_MAIL_FOR_CODE_ALERT}
      </Alert>
      <Group position="center" align="center" grow={isSmallScreen}>
        <TextInput
          my="md"
          type="number"
          placeholder="Your verification code"
          autoFocus
        />
      </Group>
      <Group position="center">
        <Button
          rightIcon={<ArrowRight size={18} />}
          fullWidth={isSmallScreen}
          onClick={() => setActiveStep(2)}>
          Verify
        </Button>
      </Group>
    </>
  );
};

export default ResetPasswordStep2;
