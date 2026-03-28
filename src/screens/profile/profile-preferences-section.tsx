import { themePreferenceAtom } from "@/stores/theme-preference";
import { THEME_VAR } from "@/utils/constants";
import { Moon, ShieldCheck } from "lucide-react-native";
import { ListGroup, Menu } from "heroui-native";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useCSSVariable } from "uniwind";

import { cssColor } from "./css";
import { LIST_CARD, TITLE_EMPHASIS } from "./constants";
import { useProfileSwitchAnimation } from "./hooks/use-profile-switch-animation";
import { IconCircle } from "./components/icon-circle";
import { MenuPickerRow } from "./components/menu-picker-row";
import { ProfileLanguageRow } from "./components/profile-language-row";
import { SectionLabel } from "./components/section-label";

type Props = {
  onSecurityPress: () => void;
};

export function ProfilePreferencesSection({ onSecurityPress }: Props) {
  const { t } = useTranslation();
  const [themePreference, setThemePreference] = useAtom(themePreferenceAtom);
  const switchAnimation = useProfileSwitchAnimation();

  const iconMuted = useCSSVariable(THEME_VAR.icon);
  const mutedFg = useCSSVariable(THEME_VAR.mutedForeground);

  const iconColor = cssColor(iconMuted, "#64748b");
  const chevronMuted = cssColor(mutedFg, "#94a3b8");

  const themeLabel = t(`profile.preferences.theme.${themePreference}`);

  const onThemeSelection = useCallback(
    (keys: Set<string | number>) => {
      const k = [...keys][0];
      if (k === "light" || k === "dark" || k === "system") {
        setThemePreference(k);
      }
    },
    [setThemePreference]
  );

  return (
    <>
      <SectionLabel>{t("profile.preferences.section")}</SectionLabel>
      <ListGroup variant="default" className={LIST_CARD}>
        <MenuPickerRow
          icon={
            <IconCircle className="bg-secondary-subtle">
              <Moon size={20} color={iconColor} />
            </IconCircle>
          }
          title={t("profile.preferences.appearance.title")}
          valueLabel={themeLabel}
          chevronColor={chevronMuted}
        >
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content
              presentation="popover"
              placement="bottom"
              align="end"
              className="min-w-[220px]"
            >
              <Menu.Group
                selectionMode="single"
                selectedKeys={new Set<string | number>([themePreference])}
                onSelectionChange={onThemeSelection}
                disallowEmptySelection
              >
                <Menu.Item id="light">
                  <Menu.ItemTitle>
                    {t("profile.preferences.theme.light")}
                  </Menu.ItemTitle>
                  <Menu.ItemIndicator />
                </Menu.Item>
                <Menu.Item id="dark">
                  <Menu.ItemTitle>
                    {t("profile.preferences.theme.dark")}
                  </Menu.ItemTitle>
                  <Menu.ItemIndicator />
                </Menu.Item>
                <Menu.Item id="system">
                  <Menu.ItemTitle>
                    {t("profile.preferences.theme.system")}
                  </Menu.ItemTitle>
                  <Menu.ItemIndicator />
                </Menu.Item>
              </Menu.Group>
            </Menu.Content>
          </Menu.Portal>
        </MenuPickerRow>

        <ProfileLanguageRow
          switchAnimation={switchAnimation}
          iconColor={iconColor}
        />

        <ListGroup.Item
          onPress={onSecurityPress}
          className="active:opacity-90"
        >
          <ListGroup.ItemPrefix className="justify-center">
            <IconCircle className="bg-secondary-subtle">
              <ShieldCheck size={20} color={iconColor} />
            </IconCircle>
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle
              className={TITLE_EMPHASIS}
              numberOfLines={1}
            >
              {t("profile.preferences.security.title")}
            </ListGroup.ItemTitle>
            <ListGroup.ItemDescription numberOfLines={2}>
              {t("profile.preferences.security.subtitle")}
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
    </>
  );
}
