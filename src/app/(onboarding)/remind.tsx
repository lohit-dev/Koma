import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { Toggle } from "@/components/ui/toggle";
import { Heading, StepHeader } from "@/features/onboarding/parts";
import { cn } from "@/lib/cn";
import { scheduleReminders } from "@/lib/notifications";
import { useSettings } from "@/store/settings";

const times = [
  { label: "6 PM", hour: 18 },
  { label: "8 PM", hour: 20 },
  { label: "9 PM", hour: 21 },
];

export default function Remind() {
  const { hour, saver } = useSettings((s) => s.reminder);
  const setReminder = (
    patch: Partial<ReturnType<typeof useSettings.getState>["reminder"]>,
  ) => useSettings.setState((s) => ({ reminder: { ...s.reminder, ...patch } }));

  const turnOn = async () => {
    const { minute } = useSettings.getState().reminder;
    const ok = await scheduleReminders({ hour, minute, saver });
    setReminder({ enabled: ok });
    router.push("/teaser");
  };

  return (
    <Screen>
      <StepHeader step={3} />
      <Heading
        title="WANT A NUDGE?"
        subtitle="One reminder a day keeps the streak alive."
      />

      <View className="mt-6 flex-row items-center gap-3 rounded-card bg-surface-2 p-4">
        <View className="size-11 items-center justify-center rounded-xl bg-gold">
          <Text variant="heading" className="text-[26px] text-ink">
            K
          </Text>
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between">
            <Text variant="strong" className="text-[13px]">
              Koma
            </Text>
            <Text variant="muted" className="text-xs">
              now
            </Text>
          </View>
          <Text variant="strong" className="text-sm">
            Your strip is waiting
          </Text>
          <Text variant="muted" className="text-[13px]">
            Ramen Night takes 3 minutes. Keep your streak.
          </Text>
        </View>
      </View>

      <Text variant="label" className="mb-3 mt-8">
        WHEN SHOULD WE REMIND YOU?
      </Text>
      <View className="flex-row gap-2.5">
        {times.map((t) => (
          <Pressable
            key={t.hour}
            accessibilityRole="radio"
            accessibilityState={{ selected: hour === t.hour }}
            onPress={() => setReminder({ hour: t.hour })}
            className={cn(
              "h-11 items-center justify-center rounded-full px-5",
              hour === t.hour ? "bg-gold" : "bg-surface",
            )}
          >
            <Text
              variant="strong"
              className={cn("text-sm", hour === t.hour && "text-ink")}
            >
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-6 h-[72px] flex-row items-center justify-between rounded-[18px] bg-surface px-[18px]">
        <View className="flex-row items-center gap-3">
          <Icon name="bell" color="#ffc83d" strokeWidth={2.2} />
          <View>
            <Text variant="strong" className="text-[15px]">
              Streak saver
            </Text>
            <Text variant="muted" className="text-[13px]">
              A second nudge an hour later
            </Text>
          </View>
        </View>
        <Toggle value={saver} onChange={(v) => setReminder({ saver: v })} />
      </View>

      <View className="mt-auto gap-3">
        <Button label="TURN ON REMINDERS" onPress={turnOn} />
        <Text
          variant="strong"
          className="py-3 text-center text-sm text-muted"
          onPress={() => router.push("/teaser")}
        >
          Maybe later
        </Text>
      </View>
    </Screen>
  );
}
