import { Menu, PressableFeedback, cn } from "heroui-native";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";

import { ROW_BORDER, TITLE_EMPHASIS } from "../constants";

type Props = {
  icon: React.ReactNode;
  title: string;
  valueLabel: string;
  chevronColor: string;
  isLast?: boolean;
  children: React.ReactNode;
};

/** Hàng mở `Menu`: trigger + portal/menu nằm trong `Menu` (HeroUI). */
export function MenuPickerRow({
  icon,
  title,
  valueLabel,
  chevronColor,
  isLast,
  children,
}: Props) {
  return (
    <Menu presentation="popover">
      <Menu.Trigger asChild>
        <PressableFeedback
          className={cn(
            "flex-row items-center gap-3 p-4 active:opacity-90",
            !isLast && ROW_BORDER
          )}
        >
          <View className="justify-center">{icon}</View>
          <View className="min-w-0 flex-1">
            <Text className={cn(TITLE_EMPHASIS, "text-base")} numberOfLines={1}>
              {title}
            </Text>
            <Text
              className="mt-0.5 text-sm text-muted-foreground"
              numberOfLines={2}
            >
              {valueLabel}
            </Text>
          </View>
          <ChevronRight size={20} color={chevronColor} />
          <PressableFeedback.Ripple />
        </PressableFeedback>
      </Menu.Trigger>
      {children}
    </Menu>
  );
}
