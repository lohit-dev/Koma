import { Pressable, View, type PressableProps } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { colors } from "@/lib/colors";
import { tap } from "@/lib/haptics";
import type { ReactNode } from "react";

/** Jagged comic-burst outline. Deterministic jitter, so it never changes between renders. */
const burst = (w: number, h: number, spikes = 30) =>
  Array.from({ length: spikes }, (_, i) => {
    const a = (i / spikes) * Math.PI * 2;
    const r = i % 2 === 0 ? 1 : 0.7 + ((i * 7) % 5) * 0.03;
    return `${w / 2 + Math.cos(a) * r * (w / 2 - 4)},${h / 2 + Math.sin(a) * r * (h / 2 - 8)}`;
  }).join(" ");

export function Starburst({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const points = burst(width, height);
  return (
    <View style={{ width, height }} className="items-center justify-center">
      <Svg width={width} height={height} style={{ position: "absolute" }}>
        <Polygon
          points={points}
          fill={colors.goldDark}
          transform="translate(0 7)"
        />
        <Polygon points={points} fill={colors.gold} />
      </Svg>
      {children}
    </View>
  );
}

/** The big tilted call-to-action. */
export function BurstButton({
  children,
  ...props
}: PressableProps & { children: ReactNode }) {
  return (
    <Pressable
      accessibilityRole="button"
      className="-rotate-2 self-center active:scale-95"
      {...props}
      onPress={(e) => {
        tap();
        props.onPress?.(e);
      }}
    >
      <Starburst width={312} height={96}>
        {children}
      </Starburst>
    </Pressable>
  );
}
