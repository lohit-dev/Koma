import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/lib/cn";
import { Rays } from "./rays";

/** Every screen starts here: dark ground, safe-area padding, optional speed lines. */
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
      <View
        className={cn("flex-1 px-6", className)}
        style={{ paddingTop: top + 8, paddingBottom: bottom + 16 }}
      >
        {children}
      </View>
    </View>
  );
}
