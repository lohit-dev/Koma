import { Pressable, type PressableProps } from "react-native";
import { cn } from "@/lib/cn";
import { colors } from "@/lib/colors";
import { tap } from "@/lib/haptics";
import { Icon } from "./icon";
import { Text } from "./text";

const styles = {
  gold: { box: "bg-gold", label: "text-ink" },
  surface: { box: "bg-surface", label: "text-text" },
};

export function Button({
  label,
  variant = "gold",
  arrow = variant === "gold",
  className,
  onPress,
  ...props
}: PressableProps & {
  label: string;
  variant?: keyof typeof styles;
  arrow?: boolean;
}) {
  const s = styles[variant];
  return (
    <Pressable
      accessibilityRole="button"
      className={cn(
        "h-16 flex-row items-center justify-center gap-2.5 rounded-btn active:opacity-80",
        s.box,
        className as string,
      )}
      onPress={(e) => {
        tap();
        onPress?.(e);
      }}
      {...props}
    >
      <Text variant="heading" className={cn("text-button", s.label)}>
        {label}
      </Text>
      {arrow && (
        <Icon name="arrow" size={24} color={colors.ink} strokeWidth={3} />
      )}
    </Pressable>
  );
}
