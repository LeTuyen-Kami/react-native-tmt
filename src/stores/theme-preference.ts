import { atom } from "jotai";

/** Khớp `Uniwind.setTheme`: light / dark / theo hệ thống. */
export type ThemePreference = "light" | "dark" | "system";

export const themePreferenceAtom = atom<ThemePreference>("system");
