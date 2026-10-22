import { db } from "@/db";
import { fonts } from "@/lib/fonts";
import { initPurchases } from "@/lib/purchases";
import { queryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import migrations from "../../drizzle/migrations";
import "../global.css";

void SplashScreen.preventAutoHideAsync();
initPurchases();

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  const [fontsLoaded, fontError] = useFonts(fonts);
  console.log("[Layout] migrations success:", success, "error:", error);
  console.log("[Layout] fontsLoaded:", fontsLoaded, "fontError:", fontError);
  if (fontError) throw fontError;
  const ready = success && fontsLoaded;

  useEffect(() => {
    if (ready) {
      SplashScreen.hide();
    }
  }, [ready]);

  if (error) throw error;
  if (!ready) return null;

  return (
    <GestureHandlerRootView className="flex-1" style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#151515" },
          }}
        />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
