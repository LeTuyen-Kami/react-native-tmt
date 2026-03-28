import { BottomSheetBlurOverlay } from "@/components/ui/bottom-sheet-overlay";
import { THEME_VAR } from "@/utils/constants";
import {
  Button,
  BottomSheet,
  PressableFeedback,
  useBottomSheet,
} from "heroui-native";
import { LogOut } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useCSSVariable } from "uniwind";

import { cssColor } from "./css";
import { useState } from "react";

type Props = {
  onPress: () => void;
};

function SignOutConfirmButton({ onConfirm }: { onConfirm: () => void }) {
  const { t } = useTranslation();
  const { onOpenChange } = useBottomSheet();

  return (
    <Button
      variant="danger"
      size="lg"
      className="mt-2 w-full"
      onPress={() => {
        onOpenChange(false);
        onConfirm();
      }}
    >
      <Button.Label className="font-semibold">
        {t("profile.signOut")}
      </Button.Label>
    </Button>
  );
}

export function ProfileSignOut({ onPress }: Props) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const destructiveFg = useCSSVariable(THEME_VAR.destructiveForeground);

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <PressableFeedback
          className="flex-row items-center justify-center gap-2 rounded-3xl border border-destructive-border bg-destructive-muted py-4 active:opacity-90"
          isDisabled={isOpen}
        >
          <LogOut size={20} color={cssColor(destructiveFg, "#991b1b")} />
          <Text className="text-base font-semibold text-destructive-foreground">
            {t("profile.signOut")}
          </Text>
          <PressableFeedback.Ripple />
        </PressableFeedback>
      </BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content>
          <View className="gap-3">
            <BottomSheet.Title className="text-center text-xl font-bold text-navy">
              {t("profile.signOutSheet.title")}
            </BottomSheet.Title>
            <BottomSheet.Description className="text-center text-base leading-6">
              {t("profile.signOutSheet.description")}
            </BottomSheet.Description>
            <SignOutConfirmButton onConfirm={onPress} />
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
