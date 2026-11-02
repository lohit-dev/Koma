import { useWindowDimensions } from "react-native";

/** Horizontal screen padding (`px-6` in Screen). */
export const GUTTER = 24;

/** Width available inside the gutters. Phones range from 360 to 430dp, so never hardcode 342. */
export const useContentWidth = () => useWindowDimensions().width - GUTTER * 2;
