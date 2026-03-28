import { changeLanguage, type SupportedLanguage } from "@/i18n/config";
import { Globe } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import type { WithTimingConfig } from "react-native-reanimated";

import { IconCircle } from "./icon-circle";
import { ListGroupSwitchRow } from "./list-group-switch-row";

type Props = {
  switchAnimation: {
    backgroundColor: {
      value: [string, string];
      timingConfig: WithTimingConfig;
    };
  };
  iconColor: string;
};

/** Chỉ hiển thị tên ngôn ngữ hiện tại ở dòng description. */
export function ProfileLanguageRow({ switchAnimation, iconColor }: Props) {
  const { t, i18n } = useTranslation();

  const currentLang: SupportedLanguage = i18n.language.startsWith("en")
    ? "en"
    : "vi";

  const description = t(`profile.preferences.lang.${currentLang}`);

  return (
    <ListGroupSwitchRow
      icon={
        <IconCircle className="bg-secondary-subtle">
          <Globe size={20} color={iconColor} />
        </IconCircle>
      }
      title={t("profile.preferences.language.title")}
      description={description}
      selected={currentLang === "en"}
      onSelectedChange={(useEnglish) => {
        void changeLanguage(useEnglish ? "en" : "vi");
      }}
      switchAnimation={switchAnimation}
    />
  );
}
