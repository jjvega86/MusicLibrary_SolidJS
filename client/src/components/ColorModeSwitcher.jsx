import { useColorMode, Button } from "@hope-ui/solid";
export default function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      Toggle {colorMode() === "light" ? "dark" : "light"}
    </Button>
  );
}
