import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight, Mail, User, X } from "tabler-icons-react";
import { useRegistrationContext } from "../context/RegistrationFormContext";
import * as yup from "yup";
import { useSearchByEmail } from "../../../hooks/services/restration.services";
import { showNotification } from "@mantine/notifications";

const RegisterStep1 = ({ isSmallScreen, setActiveStep }) => {
  const { setFormData, formData } = useRegistrationContext();

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      userName: formData.userName,
      email: formData.email,
    },
    resolver: yupResolver(
      yup.object().shape({
        userName: yup.string().required("Your full name is required."),
        email: yup
          .string()
          .email("Invalid Email Address.")
          .required("Email Address is required."),
      })
    ),
  });

  const moveToNextStep = () => {
    const currentStepData = getValues();
    setActiveStep(1);
    setFormData((prev) => ({ ...prev, ...currentStepData }));
  };

  const { mutate: checkUserExists, isLoading: checkingUserExixts } =
    useSearchByEmail({
      onSuccess: (response) => {
        const { data = {} } = response || {};
        if (!data?.response?.exists) moveToNextStep();
        else
          setError(
            "email",
            { message: data?.response?.description },
            { shouldFocus: true }
          );
      },
      onError: (_) => {
        showNotification({
          title: "Something went wrong.",
          message: "We couldn't check if that email exixts, please try again.",
          icon: <X size={20} />,
          color: "red",
        });
      },
    });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((values) => {
        checkUserExists(values.email);
      })}>
      <TextInput
        icon={<User size={18} />}
        label="Your Full Name"
        required
        autoFocus
        {...register("userName")}
        error={
          dirtyFields.userName &&
          touchedFields.userName &&
          errors.userName?.message
        }
      />
      <TextInput
        label="Email Address"
        required
        icon={<Mail size={18} />}
        {...register("email")}
        error={
          dirtyFields.email && touchedFields.email && errors.email?.message
        }
      />
      <Group align="center" position={isSmallScreen ? "center" : "apart"}>
        <Button
          rightIcon={<ArrowRight size={18} />}
          fullWidth={isSmallScreen}
          type="submit"
          loading={checkingUserExixts}
          disabled={!isValid}>
          Proceed
        </Button>
        <Text component="p" my={0}>
          <Text component="span">Already have an account? </Text>
          <Text component={Link} to="/login" weight="bold" color="blue">
            Login Instead.
          </Text>
        </Text>
      </Group>
    </Box>
  );
};

export default RegisterStep1;
