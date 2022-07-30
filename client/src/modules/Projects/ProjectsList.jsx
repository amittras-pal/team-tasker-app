import React from "react";
import { useDocumentTitle } from "@mantine/hooks";
import { APP_TITLE } from "../../constants/global.constants";

const ProjectsList = () => {
  useDocumentTitle(`${APP_TITLE} | Dashboard`);
  return <div className="dashboard">Projects List</div>;
};

export default ProjectsList;
