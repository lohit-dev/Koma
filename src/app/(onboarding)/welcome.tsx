import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Screen } from "@/components/ui/screen";
import { Starburst } from "@/components/ui/starburst";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { useContentWidth } from "@/lib/layout";
import { restorePurchases } from "@/lib/purchases";
import { useSettings } from "@/store/settings";

const tiles = ["あ", "字", "話"];

export default function Welcome() {
  // The burst is drawn at 340x246; shrink it on narrow phones so it never overflows.
  const burstWidth = Math.min(340, useContentWidth() + 16);

  const restore = async () => {
    if (await restorePurchases()) {
      useSettings.setState({ onboarded: true });
      router.replace("/home");
    }
  };

  return (
    <Screen rays>
      <View className="flex-1 justify-center gap-10">
        <Reveal zoom>
          <View className="-rotate-[4deg] items-center">
            <Starburst width={burstWidth} height={(burstWidth * 246) / 340}>
              <Text
                variant="display"
                className="text-display leading-[100px] text-ink"
              >
                KOMA
              </Text>
              <Text variant="jp" className="text-base text-ink">
                コマ · learn Japanese in panels
              </Text>
            </Starburst>
          </View>
        </Reveal>

        <Reveal index={3}>
          <View className="items-center gap-1.5">
            <Text variant="heading" className="text-center">
              ONE PANEL AT A TIME
            </Text>
            <Text variant="muted" className="w-72 text-center">
              Read manga-style strips, fill the bubble, and the words stay with
              you.
            </Text>
          </View>
        </Reveal>

        <View className="flex-row justify-center gap-5">
          {tiles.map((t, i) => (
            <Reveal key={t} zoom index={5 + i}>
              <View
                className={`h-[98px] w-[78px] items-center justify-center rounded-tile shadow-pop ${i === 1 ? "bg-gold" : "bg-paper"}`}
                style={{ transform: [{ rotate: `${(i - 1) * 7}deg` }] }}
              >
                <Text variant="jp" className="text-5xl text-ink">
                  {t}
                </Text>
              </View>
            </Reveal>
          ))}
        </View>
      </View>

      <Reveal index={8}>
        <Button label="GET STARTED" onPress={() => router.push("/goal")} />
        <TextLink label="Restore Koma Plus" onPress={restore} />
      </Reveal>
    </Screen>
  );
}
