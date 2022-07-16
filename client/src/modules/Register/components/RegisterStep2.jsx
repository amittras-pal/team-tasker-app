import { Alert, Button, Group, TextInput } from "@mantine/core";
import React from "react";
import { ArrowRight, InfoCircle } from "tabler-icons-react";
import { CHECK_MAIL_FOR_CODE_ALERT } from "../../../constants/global.constants";

const RegisterStep2 = ({ isSmallScreen }) => {
  return (
    <>
      <Alert
        color="blue"
        icon={<InfoCircle size={16} />}
        title="Account Verification">
        {CHECK_MAIL_FOR_CODE_ALERT}
      </Alert>
      <Group position="center" align="center" grow={isSmallScreen}>
        <TextInput
          type="number"
          placeholder="Your 6-digit code"
          autoFocus
          my="md"
        />
      </Group>
      <Group position="center">
        <Button rightIcon={<ArrowRight size={18} />} fullWidth={isSmallScreen}>
          Verify
        </Button>
      </Group>
    </>
  );
};

export default RegisterStep2;
