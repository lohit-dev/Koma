// These are local TTF files so the app does not depend on Google font packages.
export const fonts = {
  Bangers_400Regular: require("@/assets/fonts/Bangers-Regular.ttf"),
  Poppins_400Regular: require("@/assets/fonts/Poppins-Regular.ttf"),
  Poppins_500Medium: require("@/assets/fonts/Poppins-Medium.ttf"),
  Poppins_600SemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  ZenMaruGothic_500Medium: require("@/assets/fonts/ZenMaruGothic-Medium.ttf"),
  ZenMaruGothic_700Bold: require("@/assets/fonts/ZenMaruGothic-Bold.ttf"),
};

export const fontFamilies = {
  display: "Bangers_400Regular",
  heading: "Bangers_400Regular",
  body: "Poppins_400Regular",
  strong: "Poppins_600SemiBold",
  muted: "Poppins_400Regular",
  label: "Poppins_600SemiBold",
  jp: "ZenMaruGothic_700Bold",
} as const;
