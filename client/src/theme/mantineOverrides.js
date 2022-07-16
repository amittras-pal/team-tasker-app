export const themeOverrides = {
  emotionOptions: { key: "ws" },
  theme: {
    colorScheme: "dark",
    primaryColor: "blue",
    transitionTimingFunction: "ease-in-out",
  },
  defaultProps: {
    Modal: {
      overlayBlur: 5,
      overlayColor: "#111",
      overlayOpacity: 0.5,
      overflow: "inside",
    },
    Drawer: {
      overlayBlur: 5,
      overlayColor: "#111",
      overlayOpacity: 0.5,
      overflow: "inside",
    },
    ScrollArea: {
      type: "scroll",
      scrollbarSize: 6,
      scrollHideDelay: 1500,
    },
    TextInput: {
      mb: "sm",
    },
    PasswordInput: {
      mb: "sm",
    },
    Stepper: {
      breakpoint: "md",
      iconSize: 36,
    },
  },
};
