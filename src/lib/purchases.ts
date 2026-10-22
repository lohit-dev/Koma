import { Platform } from "react-native";
import Purchases from "react-native-purchases";
import { useQuery } from "@tanstack/react-query";
import { keys } from "@/lib/query";

const ENTITLEMENT = "plus";
const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
const enabled = Platform.OS === "android" && !!apiKey;

/** Anonymous RevenueCat user: no accounts. Call once at startup. */
export const initPurchases = () => {
  if (enabled) Purchases.configure({ apiKey: apiKey! });
};

export const usePlus = () =>
  useQuery({
    queryKey: keys.plus,
    enabled,
    staleTime: 60_000,
    queryFn: async () => {
      const info = await Purchases.getCustomerInfo();
      return ENTITLEMENT in info.entitlements.active;
    },
  }).data ?? false;

/** Anonymous restore (no accounts): returns true when Plus is active afterwards. */
export const restorePurchases = async () => {
  if (!enabled) return false;
  const info = await Purchases.restorePurchases();
  return ENTITLEMENT in info.entitlements.active;
};
