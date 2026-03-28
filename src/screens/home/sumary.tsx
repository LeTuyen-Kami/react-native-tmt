import { Activity, AlertCircle, Check, Wrench } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useCSSVariable } from "uniwind";

import { STATUS_VARIANT } from "@/utils/constants";
import { cn } from "@/utils/helper";

import type { FilterBarCounts } from "./filter-bar";

export type SummaryProps = {
  counts: FilterBarCounts;
};

type StatTone = "running" | "issue" | "maintenance";

function StatBlock({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: StatTone;
}) {
  const success = useCSSVariable("--color-success");
  const destructive = useCSSVariable("--color-destructive");
  const warning = useCSSVariable("--color-warning");
  const resolved =
    tone === "running" ? success : tone === "issue" ? destructive : warning;
  const iconColor =
    typeof resolved === "string"
      ? resolved
      : tone === "running"
        ? "#16a34a"
        : tone === "issue"
          ? "#dc2626"
          : "#c2410c";

  const iconCircle = cn(
    "mb-3 size-11 items-center justify-center rounded-full",
    tone === "running"
      ? "bg-success-subtle"
      : tone === "issue"
        ? "bg-destructive-subtle"
        : "bg-warning-subtle"
  );

  return (
    <View className="min-w-0 flex-1 items-center rounded-3xl bg-hero-subtle px-2 py-4">
      <View className={iconCircle}>
        {tone === "running" ? (
          <Check size={22} color={iconColor} strokeWidth={2.75} />
        ) : tone === "issue" ? (
          <AlertCircle size={22} color={iconColor} strokeWidth={2.5} />
        ) : (
          <Wrench size={20} color={iconColor} strokeWidth={2.5} />
        )}
      </View>
      <Text className="text-3xl font-bold tabular-nums text-white">{value}</Text>
      <Text
        className="mt-1 text-center text-[10px] font-semibold uppercase tracking-widest text-hero-muted"
        numberOfLines={2}
      >
        {label}
      </Text>
    </View>
  );
}

const Sumary = ({ counts }: SummaryProps) => {
  const { t } = useTranslation("common");
  const activityIcon = useCSSVariable("--color-primary-foreground");
  const activityColor =
    typeof activityIcon === "string" ? activityIcon : "#ffffff";

  const total = counts.all;
  const operational = counts[STATUS_VARIANT.RUNNING];
  const issues = counts[STATUS_VARIANT.ISSUE];
  const maintenance = counts[STATUS_VARIANT.MAINTENANCE];

  return (
    <View className="px-4 pb-3">
      <View className="rounded-[40px] bg-hero p-6">
        <View className="flex-row items-start justify-between gap-3">
          <View className="min-w-0 flex-1">
            <Text className="text-xs font-semibold uppercase tracking-widest text-hero-muted">
              {t("home.summary.overviewLabel")}
            </Text>
            <Text className="mt-1 text-2xl font-bold leading-tight text-white">
              {t("home.summary.machinesTotal", { count: total })}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("home.summary.activityA11y")}
            className="shrink-0 rounded-2xl bg-hero-icon-tile p-2.5 active:opacity-90"
          >
            <Activity color={activityColor} size={22} strokeWidth={2.25} />
          </Pressable>
        </View>

        <View className="mt-6 flex-row gap-2">
          <StatBlock
            value={operational}
            label={t("home.summary.operational")}
            tone="running"
          />
          <StatBlock
            value={issues}
            label={t("home.summary.issues")}
            tone="issue"
          />
          <StatBlock
            value={maintenance}
            label={t("home.summary.maintenance")}
            tone="maintenance"
          />
        </View>
      </View>
    </View>
  );
};

export default Sumary;
