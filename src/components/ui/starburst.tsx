import { useEffect, type ReactNode } from "react";
import { Pressable, View, type PressableProps } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";
import Svg, { Polygon } from "react-native-svg";
import { colors } from "@/lib/colors";
import { tap } from "@/lib/haptics";

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

/** The big tilted call-to-action: springs in, then breathes gently to draw the eye. */
export function BurstButton({
  children,
  onPress,
  ...props
}: PressableProps & { children: ReactNode }) {
  const scale = useSharedValue(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    scale.value = withDelay(
      1400,
      withRepeat(
        withSequence(
          withTiming(1.04, { duration: 800 }),
          withTiming(1, { duration: 800 }),
        ),
        -1,
      ),
    );
  }, [reduceMotion, scale]);

  const breathe = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={ZoomIn.springify()
        .damping(12)
        .delay(500)
        .reduceMotion(ReduceMotion.System)}
      style={breathe}
    >
      <Pressable
        accessibilityRole="button"
        className="-rotate-2 self-center transition-transform duration-100 active:scale-95"
        onPress={(e) => {
          tap();
          onPress?.(e);
        }}
        {...props}
      >
        <Starburst width={312} height={96}>
          {children}
        </Starburst>
      </Pressable>
    </Animated.View>
  );
}
