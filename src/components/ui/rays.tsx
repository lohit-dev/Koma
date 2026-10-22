import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

/** Manga speed-line backdrop (color matches --color-ray): thin wedges fanning out from a point (x, y as 0..1 of the screen). */
export function Rays({
  x = 0.5,
  y = 0.3,
  count = 60,
  color = "#202020",
}: {
  x?: number;
  y?: number;
  count?: number;
  color?: string;
}) {
  const cx = x * 400;
  const cy = y * 900;
  const step = (Math.PI * 2) / count;
  const wedges = Array.from({ length: count / 2 }, (_, i) => {
    const a = i * 2 * step;
    const p = (angle: number) =>
      `${cx + Math.cos(angle) * 1400} ${cy + Math.sin(angle) * 1400}`;
    return `M${cx} ${cy}L${p(a)}L${p(a + step)}Z`;
  });
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 400 900"
      preserveAspectRatio="xMidYMid slice"
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <Path d={wedges.join("")} fill={color} />
    </Svg>
  );
}
