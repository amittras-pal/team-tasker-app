import { Alert, Box, Button, Group, Text, TextInput } from "@mantine/core";
import React from "react";
import { ArrowRight, InfoCircle } from "tabler-icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CHECK_MAIL_FOR_REGISTRATION_CODE } from "../../../constants/global.constants";
import { useRegistrationContext } from "../context/RegistrationFormContext";
import { Link } from "react-router-dom";

const RegisterStep3 = ({ isSmallScreen }) => {
  const { formData } = useRegistrationContext();
  const completeRegistration = (values) => {
    console.log({ ...formData, ...values });
    // TODO: Add final step here.
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      verificationCode: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        verificationCode: yup
          .string()
          .required("Code is required.")
          .min(8, "Code must be 8 characters long")
          .max(8, "Code must be 8 characters long"),
      })
    ),
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(completeRegistration)}>
      <Alert
        color="blue"
        icon={<InfoCircle size={16} />}
        title="Account Created">
        <Text size="xs">{CHECK_MAIL_FOR_REGISTRATION_CODE}</Text>
      </Alert>
      <Group position="center" align="center" grow>
        <TextInput
          my="md"
          placeholder="Your 8-digit code"
          autoFocus
          {...register("verificationCode")}
          error={
            dirtyFields.verificationCode &&
            touchedFields.verificationCode &&
            errors.verificationCode?.message
          }
        />
      </Group>
      <Group position={isSmallScreen ? "center" : "apart"}>
        <Button
          rightIcon={<ArrowRight size={18} />}
          fullWidth={isSmallScreen}
          disabled={!isValid}
          type="submit">
          Verify & Create Account
        </Button>
        <Button
          component={Link}
          to="/login"
          fullWidth={isSmallScreen}
          variant="subtle"
          type="button">
          Skip verification for now
        </Button>
      </Group>
    </Box>
  );
};

export default RegisterStep3;
