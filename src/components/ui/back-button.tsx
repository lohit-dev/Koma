import { Pressable } from "react-native";
import { router } from "expo-router";
import { Icon, type IconName } from "./icon";

/** The round 48px button in the top corner. Goes back (or closes) by default. */
export function BackButton({
  icon = "back",
  onPress,
}: {
  icon?: IconName;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={icon === "close" ? "Close" : "Back"}
      className="size-12 items-center justify-center rounded-full bg-surface active:opacity-70"
      onPress={onPress ?? (() => router.back())}
    >
      <Icon name={icon} size={22} />
    </Pressable>
  );
}
