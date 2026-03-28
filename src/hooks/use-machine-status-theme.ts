import { useMemo } from "react";
import { useCSSVariable } from "uniwind";

import {
  MACHINE_STATUS_SHOW_FOOTER,
  MACHINE_STATUS_THEME_VARS,
  STATUS_VARIANT,
  type MachineStatusTheme,
} from "@/utils/constants";

const RESOLVE_ORDER: (keyof Omit<MachineStatusTheme, "showFooter">)[] = [
  "cardBackground",
  "cardBorder",
  "badgeBackground",
  "badgeDot",
  "badgeText",
  "efficiencyColor",
  "valueColor",
  "labelColor",
  "actionButtonBackground",
  "actionIconColor",
  "footerBackground",
  "footerForeground",
];

/**
 * Resolve machine card colors từ token `@layer theme` trong global.css (Uniwind).
 */
export function useMachineStatusTheme(status: STATUS_VARIANT): MachineStatusTheme {
  const varNames = useMemo(
    () => RESOLVE_ORDER.map((key) => MACHINE_STATUS_THEME_VARS[status][key]),
    [status]
  );
  const raw = useCSSVariable(varNames);

  return useMemo(() => {
    const values = Array.isArray(raw) ? raw : [];
    const colors = {} as Omit<MachineStatusTheme, "showFooter">;
    for (let i = 0; i < RESOLVE_ORDER.length; i++) {
      const key = RESOLVE_ORDER[i]!;
      const v = values[i];
      const resolved = typeof v === "string" || typeof v === "number" ? String(v) : "";
      colors[key] = resolved;
    }
    return {
      ...colors,
      showFooter: MACHINE_STATUS_SHOW_FOOTER[status],
    };
  }, [raw, status]);
}
