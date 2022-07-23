import { Box, Button, Group, PasswordInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import * as yup from "yup";
import { ArrowRight } from "tabler-icons-react";
import { useRegistrationContext } from "../context/RegistrationFormContext";

const RegisterStep2 = ({ isSmallScreen, setActiveStep }) => {
  const { setFormData, formData } = useRegistrationContext();
  const moveToNextStep = (currentStepData) => {
    setActiveStep(2);
    setFormData((prev) => ({ ...prev, ...currentStepData }));
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
    resolver: yupResolver(
      yup.object().shape({
        password: yup.string().required("Password is required."),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords do not match.")
          .required("Please enter password again."),
      })
    ),
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(moveToNextStep)}>
      <PasswordInput
        label="Password"
        required
        autoFocus
        {...register("password")}
        error={
          dirtyFields.password &&
          touchedFields.password &&
          errors.password?.message
        }
      />
      <PasswordInput
        label="Confirm Password"
        required
        {...register("confirmPassword")}
        error={
          dirtyFields.confirmPassword &&
          touchedFields.confirmPassword &&
          errors.confirmPassword?.message
        }
      />
      <Group position={isSmallScreen ? "center" : "right"}>
        <Button
          disabled={!isValid}
          rightIcon={<ArrowRight size={18} />}
          fullWidth={isSmallScreen}
          type="submit">
          Proceed
        </Button>
      </Group>
    </Box>
  );
};

export default RegisterStep2;
