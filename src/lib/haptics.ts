import * as Haptics from "expo-haptics";
import { useSettings } from "@/store/settings";

export const tap = () => {
  if (useSettings.getState().haptics)
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};
