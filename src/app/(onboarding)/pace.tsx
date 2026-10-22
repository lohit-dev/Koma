import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Choice, Heading, StepHeader } from "@/features/onboarding/parts";
import { useSettings } from "@/store/settings";

const paces = [
  {
    minutes: 5,
    title: "CASUAL",
    subtitle: "5 min a day|About 1 strip every 2 days",
  },
  {
    minutes: 10,
    title: "REGULAR",
    subtitle: "10 min a day|One strip and a rematch",
    badge: "MOST PICK THIS",
  },
  {
    minutes: 20,
    title: "SERIOUS",
    subtitle: "20 min a day|Strips, kanji and rematch",
  },
] as const;

export default function Pace() {
  const dailyMinutes = useSettings((s) => s.dailyMinutes);

  return (
    <Screen>
      <StepHeader step={2} />
      <Heading
        title="DAILY GOAL"
        subtitle="Small and steady beats big and rare."
      />
      <View className="mt-8 gap-4">
        {paces.map(({ minutes, ...p }) => (
          <Choice
            key={minutes}
            large
            {...p}
            selected={dailyMinutes === minutes}
            onPress={() => useSettings.setState({ dailyMinutes: minutes })}
          />
        ))}
      </View>
      <Button
        className="mt-auto"
        label="CONTINUE"
        onPress={() => router.push("/remind")}
      />
    </Screen>
  );
}
