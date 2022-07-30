import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ActionIcon,
  Footer as MantineFooter,
  Group,
  Tooltip,
} from "@mantine/core";
import { useHomeStyles } from "../Home.styles";
import { Home, Messages, Notes, Users } from "tabler-icons-react";

const NavButton = ({ pathname = "", match = "", label, icon }) => {
  return (
    <Tooltip position="top" placement="center" label={label}>
      <ActionIcon
        size="lg"
        component={Link}
        to={match}
        color={pathname === match ? "blue" : "gray"}
        variant={pathname === match ? "filled" : "hover"}>
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};

const Footer = () => {
  const { projectId = "" } = useParams();
  const { pathname } = useLocation();

  const {
    classes: { footer },
  } = useHomeStyles();

  if (!projectId?.length) return null;

  return (
    <MantineFooter
      component={Group}
      spacing="xl"
      position="center"
      align="center"
      className={footer}
      height={60}>
      <NavButton
        pathname={pathname}
        match={`/project/${projectId}`}
        label="Details"
        icon={<Home size={18} />}
      />
      <NavButton
        pathname={pathname}
        match={`/project/${projectId}/tasks`}
        label="Tasks"
        icon={<Notes size={18} />}
      />
      <NavButton
        pathname={pathname}
        match={`/project/${projectId}/chat`}
        label="Chat"
        icon={<Messages size={18} />}
      />
      <NavButton
        pathname={pathname}
        match={`/project/${projectId}/members`}
        label="Members"
        icon={<Users size={18} />}
      />
    </MantineFooter>
  );
};

export default Footer;
