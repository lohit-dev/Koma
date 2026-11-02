import { Pressable } from "react-native";
import { Text } from "./text";

/** Quiet secondary action under a button. 44px tall so it is easy to hit. */
export function TextLink({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="link"
      className="h-11 items-center justify-center"
      onPress={onPress}
    >
      <Text variant="strong" className="text-sm text-muted">
        {label}
      </Text>
    </Pressable>
  );
}
