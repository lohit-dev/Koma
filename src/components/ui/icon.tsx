import Svg, { Path } from "react-native-svg";
import { colors } from "@/lib/colors";

const paths = {
  back: "M15 5l-7 7 7 7",
  arrow: "M4 12h15M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  bell: "M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15zM10 21h4",
  close: "M6 6l12 12M18 6L6 18",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 24,
  color = colors.text,
  strokeWidth = 2.4,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d={paths[name]} />
    </Svg>
  );
}
