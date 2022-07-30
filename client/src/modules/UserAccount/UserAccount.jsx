import { Box, Button, Text } from "@mantine/core";
import React from "react";
import { useAuth } from "../Home/context/AuthContext";
import { useModals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const { currentUser } = useAuth();
  const { openConfirmModal, closeAll } = useModals();

  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.clear();
    navigate("/login");
  };

  const confirmLogout = () => {
    openConfirmModal({
      title: "Confirm Logout?",
      children: <Text size="sm">Are you sure you want to logout?</Text>,
      labels: {
        confirm: "Yes, Logout!",
        cancel: "No, Stay Logged in.",
      },
      onConfirm: logoutUser,
      onCancel: closeAll,
    });
  };

  return (
    <Box m="xl">
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <Button mt={24} onClick={confirmLogout} color="red" size="sm">
        Logout
      </Button>
    </Box>
  );
};

export default UserAccount;
