import { useSettings } from "@/store/settings";
import { Redirect } from "expo-router";

export default function Index() {
  const onboarded = useSettings((s) => s.onboarded);
  return <Redirect href={onboarded ? "/home" : "/welcome"} />;
}
