import React from "react";
import {
  ActionIcon,
  Box,
  Group,
  Header as MantineHeader,
  Loader,
  Text,
  Tooltip,
} from "@mantine/core";
import { useHomeStyles } from "../Home.styles";
import { Link, useNavigate } from "react-router-dom";
import { APP_TITLE } from "../../../constants/global.constants";
import { InfoCircle, UserCheck } from "tabler-icons-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const {
    classes: { header },
  } = useHomeStyles();

  const { isLoading, isError } = useAuth();
  const navigate = useNavigate();

  return (
    <MantineHeader height={75} className={header}>
      <Box>
        <Text component={Link} to="/" weight="bold" size="xl">
          {APP_TITLE}
        </Text>
      </Box>
      <Group spacing={4} ml="auto">
        <Tooltip
          placement="end"
          openDelay={350}
          position="bottom"
          label={isError ? "Failed to load accoutn details!" : "My Account"}>
          <ActionIcon
            size="lg"
            color={isError ? "red" : "gray"}
            onClick={() => navigate("my-account")}>
            {isLoading && <Loader size="xs" />}
            {isError && <InfoCircle size={20} />}
            {!isLoading && !isError && <UserCheck size={20} />}
          </ActionIcon>
        </Tooltip>
      </Group>
    </MantineHeader>
  );
};

export default Header;
