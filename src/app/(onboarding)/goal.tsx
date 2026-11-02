import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { Choice, Heading, StepHeader, Tile } from "@/features/onboarding/parts";
import { useSettings } from "@/store/settings";

const goals = [
  { id: "anime", title: "Anime and manga", subtitle: "Read what I love" },
  { id: "travel", title: "Travel to Japan", subtitle: "Get by on the trip" },
  { id: "jlpt", title: "Pass the JLPT", subtitle: "N5 up to N3" },
  { id: "work", title: "Work or study", subtitle: "Use it for real" },
] as const;

const levels = [
  { id: "zero", title: "ZERO", subtitle: "Never studied" },
  { id: "kana", title: "KANA", subtitle: "I know kana" },
  { id: "n5", title: "N5+", subtitle: "I know basics" },
] as const;

export default function Goal() {
  const { goal, level } = useSettings();
  const set = useSettings.setState;

  return (
    <Screen>
      <Reveal>
        <StepHeader step={1} />
      </Reveal>
      <Reveal index={1}>
        <Heading
          title="WHY JAPANESE?"
          subtitle="Pick one. You can change it later."
        />
      </Reveal>

      <View className="mt-6 gap-2.5">
        {goals.map((g, i) => (
          <Reveal key={g.id} index={2 + i}>
            <Choice
              {...g}
              selected={goal === g.id}
              onPress={() => set({ goal: g.id })}
            />
          </Reveal>
        ))}
      </View>

      <Reveal index={6}>
        <Text variant="label" className="mb-3 mt-8">
          WHERE ARE YOU STARTING?
        </Text>
        <View className="flex-row gap-2.5">
          {levels.map((l) => (
            <Tile
              key={l.id}
              {...l}
              selected={level === l.id}
              onPress={() => set({ level: l.id })}
            />
          ))}
        </View>
      </Reveal>

      {/* Beginners skip the placement check; everyone else gets 8 quick words. */}
      <Reveal pin index={7}>
        <Button
          label="CONTINUE"
          onPress={() => router.push(level === "zero" ? "/pace" : "/placement")}
        />
      </Reveal>
    </Screen>
  );
}
