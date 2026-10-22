import { Pressable, View } from "react-native";
import { cn } from "@/lib/cn";

export function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      className={cn(
        "h-7 w-[46px] justify-center rounded-full px-[3px]",
        value ? "items-end bg-gold" : "items-start bg-dim",
      )}
    >
      <View
        className={cn(
          "size-[22px] rounded-full",
          value ? "bg-ink" : "bg-muted",
        )}
      />
    </Pressable>
  );
}
