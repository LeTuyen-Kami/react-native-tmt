import { ThemedText } from "@/components/themed-text";
import { Status } from "@/components/ui/status";
import { useTheme } from "@/hooks/use-theme";
import { GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";
import { Button } from "heroui-native";
import { Bell } from "lucide-react-native";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const NAVY_TITLE = "#1a2b3c";
const DATE_MUTED = "#8b9199";

const headerShellStyle = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  paddingVertical: 20,
  borderBottomEndRadius: 16,
  borderBottomStartRadius: 16,
  zIndex: 1000,
};

function useHeaderDateLine(language: string) {
  return useMemo(() => {
    const d = new Date();
    if (language.startsWith("vi")) {
      return new Intl.DateTimeFormat("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
      .format(d)
      .toUpperCase();
  }, [language]);
}

const Header = ({ ref }: { ref?: React.RefObject<View> | null }) => {
  const { top } = useSafeAreaInsets();
  const shellStyle = { ...headerShellStyle, paddingTop: top + 8 };
  const canUseGlass = isGlassEffectAPIAvailable();
  const { t, i18n } = useTranslation("common");
  const theme = useTheme();
  const dateLine = useHeaderDateLine(i18n.language);
  const isDark = theme.text === "#ffffff";
  const titleAndIconColor = isDark ? theme.text : NAVY_TITLE;

  const inner = (
    <View className="flex flex-row items-center justify-between px-5" ref={ref}>
      <View className="min-w-0 flex-1 pr-3">
        <ThemedText
          disabledStyleColor
          className="text-[11px] font-medium uppercase tracking-[0.06em]"
          style={{ color: isDark ? theme.textSecondary : DATE_MUTED }}
        >
          {dateLine}
        </ThemedText>
        <ThemedText
          type="default"
          className="mt-0.5 text-[22px] font-bold leading-7"
          style={{ color: titleAndIconColor }}
        >
          {t("home.operations")}
        </ThemedText>
      </View>
      <View className="flex flex-row items-center gap-3">
        <Status
          variant="issue"
          className="px-3 py-1.5"
          label={t("home.issuesCount", { count: 3 })}
        />
        <Button
          className="size-10 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-default-300 dark:bg-default-100"
          isIconOnly
          variant="outline"
        >
          <Bell size={20} color={titleAndIconColor} />
        </Button>
      </View>
    </View>
  );

  if (canUseGlass) {
    return <GlassView style={shellStyle}>{inner}</GlassView>;
  }

  return (
    <BlurView intensity={100} style={shellStyle}>
      {inner}
    </BlurView>
  );
};

export default Header;
