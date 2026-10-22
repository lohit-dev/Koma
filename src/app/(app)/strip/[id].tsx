import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";

// Placeholder until the strip reader is built.
export default function Strip() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <Screen rays className="items-center justify-center">
      <Text variant="display">STRIP {id}</Text>
    </Screen>
  );
}
