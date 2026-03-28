import { Platform, Text, type TextProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

import { Fonts, type ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/utils/helper";

const themedTextVariants = tv({
  variants: {
    type: {
      default: "text-base leading-6 font-medium",
      title: "text-[48px] font-semibold leading-[52px]",
      small: "text-sm leading-5 font-medium",
      smallBold: "text-sm leading-5 font-bold",
      subtitle: "text-[32px] font-semibold leading-[44px]",
      link: "text-sm leading-[30px]",
      linkPrimary: "text-sm leading-[30px] text-[#3c87f7]",
      code: "text-xs",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export type ThemedTextProps = TextProps &
  VariantProps<typeof themedTextVariants> & {
    themeColor?: ThemeColor;
    disabledStyleColor?: boolean;
  };

export function ThemedText({
  style,
  type = "default",
  themeColor,
  className,
  disabledStyleColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      className={cn(
        themedTextVariants({ type }),
        type === "code"
          ? Platform.OS === "android"
            ? "font-bold"
            : "font-medium"
          : "",
        className ?? ""
      )}
      style={[
        type !== "linkPrimary" && !disabledStyleColor
          ? { color: theme[themeColor ?? "text"] }
          : undefined,
        type === "code" ? { fontFamily: Fonts.mono } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
