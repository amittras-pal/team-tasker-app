import React from "react";
import {
  ActionIcon,
  Box,
  Group,
  Header as MantineHeader,
  Text,
  Tooltip,
} from "@mantine/core";
import { useHomeStyles } from "../Home.styles";
import { Link } from "react-router-dom";
import { APP_TITLE } from "../../../constants/global.constants";
import { UserCheck } from "tabler-icons-react";

const Header = () => {
  const {
    classes: { header },
  } = useHomeStyles();
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
          label="My Account">
          <ActionIcon component={Link} to="my-account" size="lg">
            <UserCheck size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </MantineHeader>
  );
};

export default Header;
