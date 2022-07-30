import {
  Box,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Key, Mail } from "tabler-icons-react";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";
import { APP_TITLE } from "../../constants/global.constants";
import { useLoginUser } from "../../hooks/services/login.services";
import { showNotification } from "@mantine/notifications";

const Login = () => {
  const { breakpoints } = useMantineTheme();
  useDocumentTitle(`${APP_TITLE} | Login`);
  const isSmallScreen = useMediaQuery(`(max-width: ${breakpoints.md}px)`);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is required"),
        password: yup.string().required("Password is required"),
      })
    ),
  });

  const { mutate: loginUser, isLoading: loggingIn } = useLoginUser({
    onSuccess: (response) => {
      showNotification({
        title: response?.data?.response?.description,
        color: "green",
        icon: <Check />,
      });
      localStorage.setItem("token", response?.data?.response?.token);
      navigate("/");
    },
    onError: (error) => {
      setError(
        error?.response?.data?.error.field,
        {
          message: error?.response?.data?.error.description,
        },
        { shouldFocus: true }
      );
    },
  });

  return (
    <AuthLayout>
      <Box
        px="lg"
        py="lg"
        component="form"
        noValidate
        onSubmit={handleSubmit((values) => {
          loginUser(values);
        })}>
        <Text size="xl" mb="md">
          Login to your {APP_TITLE} account
        </Text>
        <TextInput
          label="Email Address"
          icon={<Mail size={18} />}
          required
          autoFocus
          {...register("email")}
          error={
            dirtyFields.email && touchedFields.email && errors.email?.message
          }
        />
        <PasswordInput
          label="Password"
          icon={<Key size={18} />}
          required
          {...register("password")}
          error={
            dirtyFields.password &&
            touchedFields.password &&
            errors.password?.message
          }
        />
        <Group
          align="center"
          position={isSmallScreen ? "center" : "apart"}
          mb={8}>
          <Button
            type="submit"
            loading={loggingIn}
            disabled={!isValid}
            rightIcon={<ArrowRight size={18} />}
            fullWidth={isSmallScreen}>
            Login
          </Button>
          <Text component="p" my={0}>
            <Text component="span">New to {APP_TITLE}? </Text>
            <Text component={Link} to="/register" weight="bold" color="blue">
              Create account.
            </Text>
          </Text>
        </Group>
        <Group position={isSmallScreen ? "center" : "right"}>
          <Text
            component={Link}
            to="/reset-password"
            weight="bold"
            color="blue">
            Forgot Password?
          </Text>
        </Group>
      </Box>
    </AuthLayout>
  );
};

export default Login;
