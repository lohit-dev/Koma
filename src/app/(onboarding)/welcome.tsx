import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { Rays } from "@/components/ui/rays";
import { Starburst } from "@/components/ui/starburst";
import { Text } from "@/components/ui/text";
import { restorePurchases } from "@/lib/purchases";
import { useSettings } from "@/store/settings";

const tiles = ["あ", "字", "話"];

export default function Welcome() {
  const restore = async () => {
    if (await restorePurchases()) {
      useSettings.setState({ onboarded: true });
      router.replace("/home");
    }
  };

  return (
    <View className="flex-1 bg-ground">
      <Rays y={0.24} />
      <View className="flex-1 px-6 pb-10 pt-24">
        <View className="-rotate-[4deg] items-center">
          <Starburst width={340} height={246}>
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

        <View className="mt-10 items-center gap-1.5">
          <Text variant="heading" className="text-center">
            ONE PANEL AT A TIME
          </Text>
          <Text variant="muted" className="w-72 text-center">
            Read manga-style strips, fill the bubble, and the words stay with
            you.
          </Text>
        </View>

        <View className="mt-8 flex-row justify-center gap-5">
          {tiles.map((t, i) => (
            <View
              key={t}
              className={`h-[98px] w-[78px] items-center justify-center rounded-tile shadow-pop ${i === 1 ? "bg-gold" : "bg-paper"}`}
              style={{ transform: [{ rotate: `${(i - 1) * 7}deg` }] }}
            >
              <Text variant="jp" className="text-5xl text-ink">
                {t}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-auto gap-3">
          <Button label="GET STARTED" onPress={() => router.push("/goal")} />
          <Pressable
            accessibilityRole="button"
            className="h-11 items-center justify-center"
            onPress={restore}
          >
            <Text variant="strong" className="text-sm text-muted">
              Restore Koma Plus
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
