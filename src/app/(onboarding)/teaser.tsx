import { View } from "react-native";
import { router } from "expo-router";
import { BurstButton } from "@/components/ui/starburst";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Panel } from "@/components/panel";
import { Screen } from "@/components/ui/screen";
import { colors } from "@/lib/colors";
import { useSettings } from "@/store/settings";

const finish = (href: "/strip/1" | "/home") => {
  useSettings.setState({ onboarded: true });
  router.replace(href);
};

export default function Teaser() {
  return (
    <Screen rays>
      <View className="items-center pt-4">
        <Text variant="label" className="tracking-[0.14em]">
          ALL SET
        </Text>
        <Text variant="display" className="text-[52px] leading-[56px]">
          YOUR FIRST STRIP
        </Text>
      </View>

      <View className="mt-6 flex-row flex-wrap justify-between gap-y-2 -rotate-[1.5deg]">
        {([0, 1, 2, 3] as const).map((i) => (
          <Panel key={i} index={i} width={167} />
        ))}
      </View>

      <View className="mt-8 items-center gap-1">
        <Text variant="heading" className="text-[34px]">
          TAKE A SEAT
        </Text>
        <Text variant="jp" className="text-base text-muted">
          いらっしゃいませ
        </Text>
        <Text variant="muted">3 minutes. No kana needed.</Text>
      </View>

      <View className="mt-auto items-center gap-2">
        <BurstButton onPress={() => finish("/strip/1")}>
          <View className="flex-row items-center gap-2.5">
            <Text variant="heading" className="text-4xl text-ink">
              OPEN STRIP 1
            </Text>
            <Icon name="arrow" size={26} color={colors.ink} strokeWidth={3} />
          </View>
        </BurstButton>
        <Text
          variant="strong"
          className="py-3 text-sm text-muted"
          onPress={() => finish("/home")}
        >
          Skip to home
        </Text>
      </View>
    </Screen>
  );
}
