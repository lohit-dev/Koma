import { View } from "react-native";
import { router } from "expo-router";
import { Panel } from "@/components/panel";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { Screen } from "@/components/ui/screen";
import { BurstButton } from "@/components/ui/starburst";
import { Text } from "@/components/ui/text";
import { TextLink } from "@/components/ui/text-link";
import { colors } from "@/lib/colors";
import { useContentWidth } from "@/lib/layout";
import { useSettings } from "@/store/settings";

const PANEL_GAP = 8;

const finish = (href: "/strip/1" | "/home") => {
  useSettings.setState({ onboarded: true });
  router.replace(href);
};

export default function Teaser() {
  const panelWidth = Math.floor((useContentWidth() - PANEL_GAP) / 2);

  return (
    <Screen rays>
      <Reveal>
        <View className="items-center pt-4">
          <Text variant="label" className="tracking-[0.14em]">
            ALL SET
          </Text>
          <Text variant="display" className="text-[48px] leading-[52px]">
            YOUR FIRST STRIP
          </Text>
        </View>
      </Reveal>

      {/* Panels and caption sit centred in the space between the title and the button. */}
      <View className="flex-1 justify-center gap-8 py-6">
        <View className="-rotate-[1.5deg] flex-row flex-wrap gap-2">
          {([0, 1, 2, 3] as const).map((i) => (
            <Reveal key={i} zoom index={1 + i}>
              <Panel index={i} width={panelWidth} />
            </Reveal>
          ))}
        </View>

        <Reveal index={6}>
          <View className="items-center gap-1">
            <Text variant="heading" className="text-[34px]">
              TAKE A SEAT
            </Text>
            <Text variant="jp" className="text-base text-muted">
              いらっしゃいませ
            </Text>
            <Text variant="muted">3 minutes. No kana needed.</Text>
          </View>
        </Reveal>
      </View>

      <View className="items-center">
        <BurstButton onPress={() => finish("/strip/1")}>
          <View className="flex-row items-center gap-2.5">
            <Text variant="heading" className="text-4xl text-ink">
              OPEN STRIP 1
            </Text>
            <Icon name="arrow" size={26} color={colors.ink} strokeWidth={3} />
          </View>
        </BurstButton>
        <Reveal index={9}>
          <TextLink label="Skip to home" onPress={() => finish("/home")} />
        </Reveal>
      </View>
    </Screen>
  );
}
