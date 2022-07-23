import { createStyles } from "@mantine/core";
import authBG from "../../../resources/images/auth-artwork-3.svg";

export const authLayoutStyle = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${authBG})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  container: {
    padding: 0,
    width: "100%",
    boxShadow: theme.shadows.md,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[7]
        : theme.colors.gray[3],
  },
  loadingOverlay: {
    borderRadius: theme.radius.md,
  },
}));
