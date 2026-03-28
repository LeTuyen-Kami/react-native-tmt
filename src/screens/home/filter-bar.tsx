import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { LayoutChangeEvent } from "react-native";
import { ScrollView, Text, View } from "react-native";
import { useCSSVariable } from "uniwind";

import { STATUS_VARIANT, THEME_VAR } from "@/utils/constants";
import { cn } from "@/utils/helper";
import { PressableFeedback } from "heroui-native";

export type FilterBarValue = "all" | STATUS_VARIANT;

export type FilterBarCounts = Record<FilterBarValue, number>;

/** Thứ tự chip: All, rồi các trạng thái (Running → Issues → Maintenance). */
export const FILTER_BAR_CHIPS: readonly FilterBarValue[] = [
  "all",
  STATUS_VARIANT.RUNNING,
  STATUS_VARIANT.ISSUE,
  STATUS_VARIANT.MAINTENANCE,
] as const;

export type FilterBarProps = {
  selected: FilterBarValue;
  onSelect: (value: FilterBarValue) => void;
  counts: FilterBarCounts;
};

function labelKey(
  value: FilterBarValue
):
  | "home.filter.all"
  | "status.issue"
  | "status.maintenance"
  | "status.running" {
  if (value === "all") return "home.filter.all";
  if (value === STATUS_VARIANT.ISSUE) return "status.issue";
  if (value === STATUS_VARIANT.MAINTENANCE) return "status.maintenance";
  return "status.running";
}

export default function FilterBar({
  selected,
  onSelect,
  counts,
}: FilterBarProps) {
  const { t } = useTranslation("common");
  const scrollRef = useRef<ScrollView>(null);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [chipLayouts, setChipLayouts] = useState<
    Partial<Record<FilterBarValue, { x: number; width: number }>>
  >({});

  const shadowTint = useCSSVariable(THEME_VAR.shadow);
  const shadowColor = typeof shadowTint === "string" ? shadowTint : "#0f172a";

  const chipShadow = {
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  } as const;

  const selectedLayout = chipLayouts[selected];

  useLayoutEffect(() => {
    if (!selectedLayout || scrollViewWidth <= 0) return;
    const chipCenter = selectedLayout.x + selectedLayout.width / 2;
    const maxScroll = Math.max(0, contentWidth - scrollViewWidth);
    const targetX = chipCenter - scrollViewWidth / 2;
    const scrollX = Math.min(Math.max(0, targetX), maxScroll);
    scrollRef.current?.scrollTo({ x: scrollX, animated: true });
  }, [selected, selectedLayout, scrollViewWidth, contentWidth]);

  const onChipLayout =
    (value: FilterBarValue) => (e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      setChipLayouts((prev) => {
        const cur = prev[value];
        if (cur?.x === x && cur?.width === width) return prev;
        return { ...prev, [value]: { x, width } };
      });
    };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={(e) => setScrollViewWidth(e.nativeEvent.layout.width)}
      onContentSizeChange={(w) => setContentWidth(w)}
      accessibilityRole="tablist"
      accessibilityLabel={t("home.filter.filterA11y")}
      className="max-h-14 grow-0 mx-4"
    >
      <View className="flex-row items-center gap-2 py-2">
        {FILTER_BAR_CHIPS.map((value) => {
          const isActive = selected === value;
          const count = counts[value];
          const isIssueChip = value === STATUS_VARIANT.ISSUE;

          return (
            <PressableFeedback
              key={value}
              onLayout={onChipLayout(value)}
              onPress={() => onSelect(value)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${t(labelKey(value))}, ${count}`}
              className={cn(
                "flex-row items-center gap-2 rounded-full border px-3.5 py-2 active:opacity-90",
                isActive
                  ? "border-primary bg-primary"
                  : "border-secondary-border bg-secondary"
              )}
              style={chipShadow}
            >
              <Text
                className={cn(
                  "text-sm font-medium",
                  isActive
                    ? "text-primary-foreground"
                    : "text-secondary-foreground"
                )}
              >
                {t(labelKey(value))}
              </Text>
              <View
                className={cn(
                  "min-w-[22px] items-center justify-center rounded-full px-1.5 py-0.5",
                  isActive
                    ? "bg-primary-badge"
                    : isIssueChip
                    ? "bg-destructive-subtle"
                    : "bg-secondary-subtle"
                )}
              >
                <Text
                  className={cn(
                    "text-xs font-semibold tabular-nums",
                    isActive
                      ? "text-primary-foreground"
                      : isIssueChip
                      ? "text-destructive"
                      : "text-secondary-on-subtle"
                  )}
                >
                  {count}
                </Text>
              </View>
              <PressableFeedback.Ripple />
            </PressableFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
}
