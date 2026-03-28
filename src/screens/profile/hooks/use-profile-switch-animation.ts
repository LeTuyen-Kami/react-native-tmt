import { THEME_VAR } from "@/utils/constants";
import { useMemo } from "react";
import { useCSSVariable } from "uniwind";

import { cssColor } from "../css";
import { switchTiming } from "../constants";

export function useProfileSwitchAnimation() {
  const hero = useCSSVariable(THEME_VAR.hero);
  const secondarySubtle = useCSSVariable(THEME_VAR.secondarySubtle);

  return useMemo(
    () => ({
      backgroundColor: {
        value: [
          cssColor(secondarySubtle, "#e2e8f0"),
          cssColor(hero, "#1a3652"),
        ] as [string, string],
        timingConfig: switchTiming,
      },
    }),
    [hero, secondarySubtle]
  );
}
