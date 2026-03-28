import { Platform } from "react-native";

export const isIOS = Platform.OS === "ios";

export enum STATUS_VARIANT {
  ISSUE = "issue",
  MAINTENANCE = "maintenance",
  RUNNING = "running",
}

/** Tên biến CSS trong @layer theme (global.css) — dùng với useCSSVariable. */
export const THEME_VAR = {
  shadow: "--color-shadow",
  canvas: "--color-canvas",
  navy: "--color-navy",
  hero: "--color-hero",
  heroMuted: "--color-hero-muted",
  info: "--color-info",
  infoSubtle: "--color-info-subtle",
  destructive: "--color-destructive",
  destructiveSubtle: "--color-destructive-subtle",
  warning: "--color-warning",
  warningSubtle: "--color-warning-subtle",
  secondarySubtle: "--color-secondary-subtle",
  icon: "--color-icon",
  mutedForeground: "--color-muted-foreground",
  destructiveForeground: "--color-destructive-foreground",
  border: "--color-border",
} as const;

/** Trạng thái có footer cảnh báo hay không (logic UI, không phải màu). */
export const MACHINE_STATUS_SHOW_FOOTER: Record<STATUS_VARIANT, boolean> = {
  [STATUS_VARIANT.RUNNING]: false,
  [STATUS_VARIANT.MAINTENANCE]: false,
  [STATUS_VARIANT.ISSUE]: true,
};

/**
 * Map từng trạng thái → biến màu design token.
 * Giá trị phải khớp `--color-*` trong global.css (`@layer theme` + `@variant`).
 */
export const MACHINE_STATUS_THEME_VARS: Record<
  STATUS_VARIANT,
  Record<
    | "cardBackground"
    | "cardBorder"
    | "badgeBackground"
    | "badgeDot"
    | "badgeText"
    | "efficiencyColor"
    | "valueColor"
    | "labelColor"
    | "actionButtonBackground"
    | "actionIconColor"
    | "footerBackground"
    | "footerForeground",
    string
  >
> = {
  [STATUS_VARIANT.RUNNING]: {
    cardBackground: "--color-card",
    cardBorder: "--color-border",
    badgeBackground: "--color-success-subtle",
    badgeDot: "--color-success",
    badgeText: "--color-success-foreground",
    efficiencyColor: "--color-success-emphasis",
    valueColor: "--color-foreground",
    labelColor: "--color-muted-foreground",
    actionButtonBackground: "--color-muted",
    actionIconColor: "--color-icon",
    footerBackground: "--color-transparent",
    footerForeground: "--color-transparent",
  },
  [STATUS_VARIANT.MAINTENANCE]: {
    cardBackground: "--color-card",
    cardBorder: "--color-border",
    badgeBackground: "--color-warning-subtle",
    badgeDot: "--color-warning",
    badgeText: "--color-warning-foreground",
    efficiencyColor: "--color-foreground",
    valueColor: "--color-foreground",
    labelColor: "--color-warning-muted-foreground",
    actionButtonBackground: "--color-muted",
    actionIconColor: "--color-icon",
    footerBackground: "--color-transparent",
    footerForeground: "--color-transparent",
  },
  [STATUS_VARIANT.ISSUE]: {
    cardBackground: "--color-destructive-muted",
    cardBorder: "--color-destructive-border",
    badgeBackground: "--color-destructive-subtle",
    badgeDot: "--color-destructive",
    badgeText: "--color-destructive-foreground",
    efficiencyColor: "--color-destructive-foreground",
    valueColor: "--color-foreground",
    labelColor: "--color-destructive-muted-foreground",
    actionButtonBackground: "--color-muted",
    actionIconColor: "--color-icon",
    footerBackground: "--color-destructive-footer",
    footerForeground: "--color-destructive-on-footer",
  },
};

/** Màu đã resolve (sau useCSSVariable / hook). */
export type MachineStatusTheme = {
  cardBackground: string;
  cardBorder: string;
  badgeBackground: string;
  badgeDot: string;
  badgeText: string;
  efficiencyColor: string;
  valueColor: string;
  labelColor: string;
  showFooter: boolean;
  footerBackground?: string;
  footerForeground?: string;
  actionButtonBackground: string;
  actionIconColor: string;
};
