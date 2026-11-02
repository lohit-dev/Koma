import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
  FadeInDown,
  ReduceMotion,
  ZoomIn,
} from "react-native-reanimated";

const STAGGER_MS = 70;

/**
 * Entrance animation for one block of a screen. Give siblings rising `index` values to stagger them.
 * `zoom` pops in with a spring (badges, panels); `pin` pushes the block to the bottom of the Screen.
 * Keep rotation on a child View, not here: layout animations own this view's transform.
 */
export function Reveal({
  index = 0,
  zoom,
  pin,
  style,
  children,
}: {
  index?: number;
  zoom?: boolean;
  pin?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const entering = (
    zoom ? ZoomIn.springify().damping(14) : FadeInDown.duration(380)
  )
    .delay(index * STAGGER_MS)
    .reduceMotion(ReduceMotion.System);

  return (
    <Animated.View
      entering={entering}
      style={[pin && { marginTop: "auto" }, style]}
    >
      {children}
    </Animated.View>
  );
}
