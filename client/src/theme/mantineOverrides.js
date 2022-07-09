export const themeOverrides = {
  emotionOptions: { key: "ws" },
  theme: {
    colorScheme: "dark",
    primaryColor: "orange",
    transitionTimingFunction: "ease-in-out",
    loader: "dots",
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
  },
};
