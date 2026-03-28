import { cn } from "heroui-native";
import { View } from "react-native";

export function IconCircle({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <View
      className={cn(
        "size-11 items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </View>
  );
}
