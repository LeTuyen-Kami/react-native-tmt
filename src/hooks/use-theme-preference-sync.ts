import { themePreferenceAtom } from "@/stores/theme-preference";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Uniwind } from "uniwind";

/** Đồng bộ lựa chọn theme trong Jotai → Uniwind (CSS variables / class tailwind). */
export function useThemePreferenceSync() {
  const [preference] = useAtom(themePreferenceAtom);

  useEffect(() => {
    Uniwind.setTheme(preference);
  }, [preference]);
}
