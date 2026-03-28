import { useRouter, type Href } from "expo-router";
import { AlertCircle, ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { useMachineStatusTheme } from "@/hooks/use-machine-status-theme";
import {
  STATUS_VARIANT,
  THEME_VAR,
  type MachineStatusTheme,
} from "@/utils/constants";
import { PressableFeedback } from "heroui-native";
import { useCSSVariable } from "uniwind";

export type HomeMachineItemProps = {
  id: string;
  status: STATUS_VARIANT;
  title: string;
  subtitle: string;
  unitsToday: string;
  efficiency: string;
  uptime: string;
  /** Shown when `status` is issue and `theme.showFooter` is true. */
  alertMessage?: string;
  onPress?: () => void;
};

function StatusBadge({
  label,
  theme,
}: {
  label: string;
  theme: MachineStatusTheme;
}) {
  return (
    <View
      className="flex-row items-center gap-1.5 rounded-full px-3 py-1.5"
      style={{ backgroundColor: theme.badgeBackground }}
    >
      <View
        className="size-2 rounded-full"
        style={{ backgroundColor: theme.badgeDot }}
      />
      <Text
        className="text-sm font-semibold"
        style={{ color: theme.badgeText }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

function MetricBlock({
  value,
  label,
  valueColor,
  labelColor,
  valueClassName,
}: {
  value: string;
  label: string;
  valueColor: string;
  labelColor: string;
  valueClassName?: string;
}) {
  return (
    <View className="min-w-0 flex-1">
      <Text
        className={valueClassName ?? "text-xl font-bold tabular-nums"}
        style={{ color: valueColor }}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {value}
      </Text>
      <Text
        className="mt-1 text-[10px] font-semibold uppercase tracking-wide"
        style={{ color: labelColor }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const HomeItem = ({
  id,
  status,
  title,
  subtitle,
  unitsToday,
  efficiency,
  uptime,
  alertMessage,
  onPress,
  index,
}: HomeMachineItemProps & { index: number }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const theme = useMachineStatusTheme(status);
  const shadowTint = useCSSVariable(THEME_VAR.shadow);
  const cardShadowColor =
    typeof shadowTint === "string" ? shadowTint : "#0f172a";

  const statusLabelKey =
    status === STATUS_VARIANT.ISSUE
      ? "status.issue"
      : status === STATUS_VARIANT.MAINTENANCE
      ? "status.maintenance"
      : "status.running";

  const handleNavigate = () => {
    if (onPress) {
      onPress();
      return;
    }
    router.push(`/home/${id}` as Href);
  };

  const unitsSizeClass =
    unitsToday.length > 6
      ? "text-lg font-bold tabular-nums"
      : "text-2xl font-bold tabular-nums";

  return (
    <View className="px-4 pb-3">
      <PressableFeedback
        onPress={handleNavigate}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${t(statusLabelKey)}`}
        className="rounded-[28px] border p-5 active:opacity-95"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorder,
          shadowColor: cardShadowColor,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.06,
          shadowRadius: 16,
          elevation: 3,
        }}
      >
        <View className="flex-row items-start justify-between gap-3">
          <View className="min-w-0 flex-1 pr-2">
            <Text
              className="text-lg font-bold leading-tight"
              style={{ color: theme.valueColor }}
              numberOfLines={2}
            >
              {title}
            </Text>
            <Text
              className="mt-1 text-sm leading-5"
              style={{ color: theme.labelColor }}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          </View>
          <StatusBadge label={t(statusLabelKey)} theme={theme} />
        </View>

        <View className="mt-6 flex-row items-center gap-2">
          <MetricBlock
            value={unitsToday}
            label={t("home.machineCard.unitsToday")}
            valueColor={theme.valueColor}
            labelColor={theme.labelColor}
            valueClassName={unitsSizeClass}
          />
          <MetricBlock
            value={efficiency}
            label={t("home.machineCard.efficiency")}
            valueColor={theme.efficiencyColor}
            labelColor={theme.labelColor}
          />
          <MetricBlock
            value={uptime}
            label={t("home.machineCard.uptime")}
            valueColor={theme.valueColor}
            labelColor={theme.labelColor}
          />
          <View
            className="size-11 items-center justify-center rounded-full bg-muted-foreground/10"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <ChevronRight
              size={22}
              color={theme.actionIconColor}
              strokeWidth={2.25}
            />
          </View>
        </View>

        {theme.showFooter && alertMessage ? (
          <View
            className="mt-4 flex-row items-center gap-2 rounded-full px-3 py-2.5"
            style={{ backgroundColor: theme.footerBackground }}
          >
            <AlertCircle
              size={18}
              color={theme.footerForeground}
              strokeWidth={2}
            />
            <Text
              className="flex-1 text-sm font-semibold leading-5"
              style={{ color: theme.footerForeground }}
              numberOfLines={2}
            >
              {alertMessage}
            </Text>
          </View>
        ) : null}
        <PressableFeedback.Ripple />
      </PressableFeedback>
    </View>
  );
};

export default HomeItem;
