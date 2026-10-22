import { Pressable, View } from "react-native";
import { BackButton } from "@/components/ui/back-button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { colors } from "@/lib/colors";
import { cn } from "@/lib/cn";
import { tap } from "@/lib/haptics";

export const STEPS = 3;

/** Top row of every onboarding step: back button and progress. */
export function StepHeader({ step }: { step: 1 | 2 | 3 }) {
  return (
    <View className="flex-row items-center gap-4">
      <BackButton />
      <View className="flex-1 flex-row gap-1.5">
        {Array.from({ length: STEPS }, (_, i) => (
          <View
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < step ? "bg-gold" : "bg-dim",
            )}
          />
        ))}
      </View>
    </View>
  );
}

export function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View className="mt-6 gap-0.5">
      <Text variant="display">{title}</Text>
      <Text variant="muted">{subtitle}</Text>
    </View>
  );
}

type ChoiceProps = {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
  large?: boolean;
  badge?: string;
};

/** A single-select row. Gold when selected. */
export function Choice({
  title,
  subtitle,
  selected,
  onPress,
  large,
  badge,
}: ChoiceProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={() => {
        tap();
        onPress();
      }}
      className={cn(
        "flex-row items-center justify-between rounded-card px-5",
        large ? "h-24" : "h-[62px] rounded-2xl px-[18px]",
        selected ? "bg-gold" : "bg-surface",
      )}
    >
      <View>
        {large ? (
          <Text
            variant="heading"
            className={cn("text-[32px] leading-8", selected && "text-ink")}
          >
            {title}
          </Text>
        ) : (
          <Text variant="strong" className={selected ? "text-ink" : undefined}>
            {title}
          </Text>
        )}
        {large && (
          <Text
            variant="strong"
            className={cn("text-sm", selected && "text-ink")}
          >
            {subtitle.split("|")[0]}
          </Text>
        )}
        <Text
          variant="muted"
          className={cn("text-[13px]", selected && "text-gold-ink")}
        >
          {large ? subtitle.split("|")[1] : subtitle}
        </Text>
      </View>
      {selected && (
        <Icon
          name="check"
          size={large ? 26 : 22}
          color={colors.ink}
          strokeWidth={3.2}
        />
      )}
      {badge && (
        <View className="absolute -top-3 right-4 rotate-3 rounded-md bg-ink px-2 pb-0.5 pt-1">
          <Text
            variant="heading"
            className="text-[15px] tracking-widest text-gold"
          >
            {badge}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

/** Compact square-ish choice, used for the three starting levels. */
export function Tile({
  title,
  subtitle,
  selected,
  onPress,
}: Omit<ChoiceProps, "large" | "badge">) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={() => {
        tap();
        onPress();
      }}
      className={cn(
        "h-[78px] flex-1 items-center justify-center rounded-2xl",
        selected ? "bg-gold" : "bg-surface",
      )}
    >
      <Text
        variant="heading"
        className={cn("text-[26px] leading-7", selected && "text-ink")}
      >
        {title}
      </Text>
      <Text
        variant="muted"
        className={cn("text-xs", selected && "text-gold-ink")}
      >
        {subtitle}
      </Text>
    </Pressable>
  );
}
