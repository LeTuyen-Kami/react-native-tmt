import { BottomSheetBlurOverlay } from "@/components/ui/bottom-sheet-overlay";
import { THEME_VAR } from "@/utils/constants";
import { Headphones, Info, UserX } from "lucide-react-native";
import {
  BottomSheet,
  Button,
  ListGroup,
  cn,
  useBottomSheet,
} from "heroui-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";

import { cssColor } from "./css";
import { LIST_CARD, ROW_BORDER, TITLE_EMPHASIS } from "./constants";
import { IconCircle } from "./components/icon-circle";
import { SectionLabel } from "./components/section-label";

type Props = {
  onHelpPress: () => void;
  onAboutPress: () => void;
  onDeleteAccountPress: () => void;
};

function DeleteAccountConfirmButton({ onConfirm }: { onConfirm: () => void }) {
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
        {t("profile.deleteAccount")}
      </Button.Label>
    </Button>
  );
}

export function ProfileSupportSection({
  onHelpPress,
  onAboutPress,
  onDeleteAccountPress,
}: Props) {
  const { t } = useTranslation();
  const [deleteSheetOpen, setDeleteSheetOpen] = useState(false);
  const iconMuted = useCSSVariable(THEME_VAR.icon);
  const mutedFg = useCSSVariable(THEME_VAR.mutedForeground);
  const destructiveFg = useCSSVariable(THEME_VAR.destructiveForeground);

  const iconColor = cssColor(iconMuted, "#64748b");
  const chevronMuted = cssColor(mutedFg, "#94a3b8");
  const deleteIconColor = cssColor(destructiveFg, "#991b1b");

  return (
    <>
      <SectionLabel>{t("profile.support.section")}</SectionLabel>
      <ListGroup variant="default" className={cn(LIST_CARD, "mb-8")}>
        <ListGroup.Item
          onPress={onHelpPress}
          className={cn(ROW_BORDER, "active:opacity-90")}
        >
          <ListGroup.ItemPrefix className="justify-center">
            <IconCircle className="bg-secondary-subtle">
              <Headphones size={20} color={iconColor} />
            </IconCircle>
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle className={TITLE_EMPHASIS} numberOfLines={1}>
              {t("profile.support.help.title")}
            </ListGroup.ItemTitle>
            <ListGroup.ItemDescription numberOfLines={2}>
              {t("profile.support.help.subtitle")}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix
            iconProps={{
              size: 20,
              color: chevronMuted,
            }}
          />
        </ListGroup.Item>
        <ListGroup.Item
          onPress={onAboutPress}
          className={cn(ROW_BORDER, "active:opacity-90")}
        >
          <ListGroup.ItemPrefix className="justify-center">
            <IconCircle className="bg-secondary-subtle">
              <Info size={20} color={iconColor} />
            </IconCircle>
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle className={TITLE_EMPHASIS} numberOfLines={1}>
              {t("profile.support.about.title")}
            </ListGroup.ItemTitle>
            <ListGroup.ItemDescription numberOfLines={2}>
              {t("profile.support.about.subtitle")}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix
            iconProps={{
              size: 20,
              color: chevronMuted,
            }}
          />
        </ListGroup.Item>
        <ListGroup.Item
          onPress={() => setDeleteSheetOpen(true)}
          disabled={deleteSheetOpen}
          className="active:opacity-90"
        >
          <ListGroup.ItemPrefix className="justify-center">
            <IconCircle className="bg-destructive-muted">
              <UserX size={20} color={deleteIconColor} />
            </IconCircle>
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle
              className={cn(TITLE_EMPHASIS, "text-destructive")}
              numberOfLines={1}
            >
              {t("profile.support.deleteAccount.title")}
            </ListGroup.ItemTitle>
            <ListGroup.ItemDescription numberOfLines={2}>
              {t("profile.support.deleteAccount.subtitle")}
            </ListGroup.ItemDescription>
          </ListGroup.ItemContent>
          <ListGroup.ItemSuffix
            iconProps={{
              size: 20,
              color: chevronMuted,
            }}
          />
        </ListGroup.Item>
      </ListGroup>

      <BottomSheet isOpen={deleteSheetOpen} onOpenChange={setDeleteSheetOpen}>
        <BottomSheet.Portal>
          <BottomSheetBlurOverlay />
          <BottomSheet.Content>
            <View className="gap-3">
              <BottomSheet.Title className="text-center text-xl font-bold text-navy">
                {t("profile.deleteAccountSheet.title")}
              </BottomSheet.Title>
              <BottomSheet.Description className="text-center text-base leading-6">
                {t("profile.deleteAccountSheet.description")}
              </BottomSheet.Description>
              <DeleteAccountConfirmButton onConfirm={onDeleteAccountPress} />
            </View>
          </BottomSheet.Content>
        </BottomSheet.Portal>
      </BottomSheet>
    </>
  );
}
