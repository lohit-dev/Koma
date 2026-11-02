import { ScrollView, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/lib/cn";
import { Rays } from "./rays";

/**
 * Every screen starts here: dark ground, safe-area padding, optional speed lines.
 * Content scrolls only when it does not fit (small phones, large system font), and `mt-auto` still pins things to the bottom.
 */
export function Screen({
  rays,
  className,
  children,
  ...props
}: ViewProps & { rays?: boolean }) {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-ground" {...props}>
      {rays && <Rays />}
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: top + 8,
          paddingBottom: bottom + 16,
        }}
      >
        <View className={cn("grow px-6", className)}>{children}</View>
      </ScrollView>
    </View>
  );
}
