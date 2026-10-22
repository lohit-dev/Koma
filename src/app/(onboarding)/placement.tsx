import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";
import { BackButton } from "@/components/ui/back-button";
import {
  N5_THRESHOLD,
  placementWords,
} from "@/features/onboarding/placement-words";
import { cn } from "@/lib/cn";
import { useSettings } from "@/store/settings";

export default function Placement() {
  const [i, setI] = useState(0);
  const [known, setKnown] = useState(0);

  const answer = (knew: boolean) => {
    const total = known + (knew ? 1 : 0);
    if (i + 1 < placementWords.length) {
      setKnown(total);
      setI(i + 1);
    } else {
      useSettings.setState({ level: total >= N5_THRESHOLD ? "n5" : "kana" });
      router.replace("/pace");
    }
  };

  return (
    <Screen rays>
      <View className="flex-row items-center">
        <BackButton />
        <View className="flex-1 items-center">
          <Text variant="heading" className="text-[26px]">
            QUICK CHECK
          </Text>
          <Text variant="muted" className="text-xs">
            Question {i + 1} of {placementWords.length}
          </Text>
        </View>
        <View className="size-12" />
      </View>

      <View className="mt-5 flex-row gap-1.5">
        {placementWords.map((w, n) => (
          <View
            key={w}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              n <= i ? "bg-gold" : "bg-dim",
            )}
          />
        ))}
      </View>

      <View className="mt-8 h-72 items-center rounded-hero bg-paper pt-7 shadow-pop-lg">
        <Text variant="heading" className="text-[22px] text-ink/60">
          DO YOU KNOW THIS WORD?
        </Text>
        <Text
          variant="jp"
          className="mt-12 text-[76px] leading-[84px] text-ink"
        >
          {placementWords[i]}
        </Text>
        <Text variant="muted" className="mt-3 text-ink/60">
          Be honest. It picks your starting chapter.
        </Text>
      </View>

      <View className="mt-6 flex-row gap-3">
        <Button
          className="h-[72px] flex-1 rounded-card"
          variant="surface"
          label="NOT YET"
          onPress={() => answer(false)}
        />
        <Button
          className="h-[72px] flex-1 rounded-card"
          label="I KNOW IT"
          onPress={() => answer(true)}
        />
      </View>

      <Text
        variant="strong"
        className="mt-auto text-center text-sm text-muted"
        onPress={() => router.replace("/pace")}
      >
        Skip the check
      </Text>
    </Screen>
  );
}
