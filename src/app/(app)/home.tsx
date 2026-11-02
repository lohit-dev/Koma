import { Reveal } from "@/components/ui/reveal";
import { Screen } from "@/components/ui/screen";
import { Text } from "@/components/ui/text";

// Placeholder until the Home hub is built.
export default function Home() {
  return (
    <Screen rays className="items-center justify-center">
      <Reveal zoom>
        <Text variant="display">HOME</Text>
      </Reveal>
      <Reveal index={2}>
        <Text variant="muted">The hub comes next.</Text>
      </Reveal>
    </Screen>
  );
}
