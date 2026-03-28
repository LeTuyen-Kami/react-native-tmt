import { ThemedText } from "@/components/themed-text";
import { useTranslation } from "react-i18next";
import { View, type ViewProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/utils/helper";

const root = tv({
  base: "flex-row items-center gap-1.5 rounded-full px-2.5 py-1",
  variants: {
    variant: {
      issue: "bg-destructive-subtle",
      maintenance: "bg-warning-subtle",
      running: "bg-success-subtle",
    },
  },
  defaultVariants: {
    variant: "running",
  },
});

const dot = tv({
  base: "size-2 shrink-0 rounded-full",
  variants: {
    variant: {
      issue: "bg-destructive",
      maintenance: "bg-warning",
      running: "bg-success",
    },
  },
  defaultVariants: {
    variant: "running",
  },
});

const labelTv = tv({
  base: "text-xs font-medium",
  variants: {
    variant: {
      issue: "text-destructive-foreground",
      maintenance: "text-warning-foreground",
      running: "text-success-foreground",
    },
  },
  defaultVariants: {
    variant: "running",
  },
});

export type StatusVariant = NonNullable<VariantProps<typeof root>["variant"]>;

export type StatusProps = ViewProps &
  VariantProps<typeof root> & {
    /** Overrides the default translated label for this variant */
    label?: string;
  };

export function Status({
  variant = "running",
  label,
  className,
  ...rest
}: StatusProps) {
  const { t } = useTranslation("common");
  const v: StatusVariant = variant ?? "running";
  const text = label ?? t(`status.${v}`) ?? "";

  return (
    <View className={cn(root({ variant: v }), className ?? "")} {...rest}>
      <View className={dot({ variant: v })} importantForAccessibility="no" />
      <ThemedText className={labelTv({ variant: v })} disabledStyleColor>
        {text}
      </ThemedText>
    </View>
  );
}

export default Status;
