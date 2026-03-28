import type { ReactNode } from "react";
import { Text } from "react-native";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Text className="mb-2 mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </Text>
  );
}
