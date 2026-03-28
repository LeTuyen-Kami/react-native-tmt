import { Text, View } from "react-native";

export function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <View className="flex-1 rounded-xl bg-primary-foreground/10 px-2 py-3">
      <Text className="text-center text-xl font-bold text-primary-foreground">
        {value}
      </Text>
      <Text className="mt-1 text-center text-[10px] font-semibold uppercase tracking-wide text-hero-muted">
        {label}
      </Text>
    </View>
  );
}
