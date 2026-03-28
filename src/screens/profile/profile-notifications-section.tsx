import { THEME_VAR } from "@/utils/constants";
import { Bell, Siren, Wrench } from "lucide-react-native";
import { ListGroup } from "heroui-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCSSVariable } from "uniwind";

import { cssColor } from "./css";
import { LIST_CARD } from "./constants";
import { useProfileSwitchAnimation } from "./hooks/use-profile-switch-animation";
import { IconCircle } from "./components/icon-circle";
import { ListGroupSwitchRow } from "./components/list-group-switch-row";
import { SectionLabel } from "./components/section-label";

export function ProfileNotificationsSection() {
  const { t } = useTranslation();
  const switchAnimation = useProfileSwitchAnimation();

  const info = useCSSVariable(THEME_VAR.info);
  const destructive = useCSSVariable(THEME_VAR.destructive);
  const warning = useCSSVariable(THEME_VAR.warning);

  const icon = useMemo(
    () => ({
      info: cssColor(info, "#2563eb"),
      destructive: cssColor(destructive, "#dc2626"),
      warning: cssColor(warning, "#ea580c"),
    }),
    [info, destructive, warning]
  );

  const [notificationsOn, setNotificationsOn] = useState(true);
  const [criticalOn, setCriticalOn] = useState(true);
  const [maintenanceOn, setMaintenanceOn] = useState(false);

  return (
    <>
      <SectionLabel>{t("profile.notifications.section")}</SectionLabel>
      <ListGroup variant="default" className={LIST_CARD}>
        <ListGroupSwitchRow
          icon={
            <IconCircle className="bg-info-subtle">
              <Bell size={20} color={icon.info} />
            </IconCircle>
          }
          title={t("profile.notifications.enable.title")}
          description={t("profile.notifications.enable.subtitle")}
          selected={notificationsOn}
          onSelectedChange={setNotificationsOn}
          switchAnimation={switchAnimation}
        />
        <ListGroupSwitchRow
          icon={
            <IconCircle className="bg-destructive-subtle">
              <Siren size={20} color={icon.destructive} />
            </IconCircle>
          }
          title={t("profile.notifications.critical.title")}
          description={t("profile.notifications.critical.subtitle")}
          selected={criticalOn}
          onSelectedChange={setCriticalOn}
          switchAnimation={switchAnimation}
        />
        <ListGroupSwitchRow
          icon={
            <IconCircle className="bg-warning-subtle">
              <Wrench size={20} color={icon.warning} />
            </IconCircle>
          }
          title={t("profile.notifications.maintenance.title")}
          description={t("profile.notifications.maintenance.subtitle")}
          selected={maintenanceOn}
          onSelectedChange={setMaintenanceOn}
          switchAnimation={switchAnimation}
          isLast
        />
      </ListGroup>
    </>
  );
}
