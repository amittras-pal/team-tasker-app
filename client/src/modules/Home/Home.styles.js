import { createStyles } from "@mantine/core";

export const useHomeStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.sm,
    flexGrow: 0,
  },
  breadcrumbSeparator: {
    marginLeft: 5,
    marginRight: 5,
  },
  body: {
    flexGrow: 1,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.sm,
    flexGrow: 0,
  },
}));
