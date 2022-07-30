import { Box, Button, Group, PasswordInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import * as yup from "yup";
import { ArrowRight, Check } from "tabler-icons-react";
import { useRegistrationContext } from "../context/RegistrationFormContext";
import { useCreateAccount } from "../../../hooks/services/restration.services";
import { showNotification } from "@mantine/notifications";

const RegisterStep2 = ({ isSmallScreen, setActiveStep }) => {
  const { setFormData, formData } = useRegistrationContext();

  const {
    handleSubmit,
    register,
    getValues,
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

  const moveToNextStep = () => {
    const currentStepData = getValues();
    setActiveStep(2);
    setFormData((prev) => ({ ...prev, ...currentStepData }));
  };

  const { mutate: createAccount, isLoading: creatingAccount } =
    useCreateAccount({
      onSuccess: (response) => {
        showNotification({
          title: response?.data?.response?.description,
          color: "green",
          icon: <Check />,
        });
        moveToNextStep();
      },
      onError: (error) => {
        console.log(error);
      },
    });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((values) => {
        createAccount({
          name: formData.userName,
          email: formData.email,
          password: values.password,
        });
      })}>
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
          loading={creatingAccount}
          type="submit">
          Proceed
        </Button>
      </Group>
    </Box>
  );
};

export default RegisterStep2;
