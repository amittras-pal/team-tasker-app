import { createStyles } from "@mantine/core";

// Generic Custom styling for the stepper component, use this in places where a stepper is required.
// Create a new style object if another style is required for a specific module.
export const useStepperStyles = createStyles((theme) => ({
  separator: {
    height: 2,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
  separatorActive: {
    backgroundColor: theme.colors.blue[5],
  },
}));
