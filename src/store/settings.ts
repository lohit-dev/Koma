import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Storage from "expo-sqlite/kv-store";

// Synchronous adapter: settings hydrate before the first render, so there is no redirect flash.
const sync = {
  getItem: (key: string) => Storage.getItemSync(key),
  setItem: (key: string, value: string) => Storage.setItemSync(key, value),
  removeItem: (key: string) => Storage.removeItemSync(key),
};

type Settings = {
  onboarded: boolean;
  goal: "anime" | "travel" | "jlpt" | "work";
  level: "zero" | "kana" | "n5";
  dailyMinutes: 5 | 10 | 20;
  reminder: { enabled: boolean; hour: number; minute: number; saver: boolean };
  furigana: boolean;
  sound: boolean;
  haptics: boolean;
};

export const useSettings = create<Settings>()(
  persist<Settings>(
    () => ({
      onboarded: false,
      goal: "anime",
      level: "zero",
      dailyMinutes: 10,
      reminder: { enabled: false, hour: 20, minute: 0, saver: true },
      furigana: true,
      sound: true,
      haptics: true,
    }),
    { name: "settings", storage: createJSONStorage(() => sync) },
  ),
);

// Update with: useSettings.setState({ furigana: false })
