import { AVATAR_URI } from "./constants";
import { Image } from "expo-image";
import { Check, Pencil } from "lucide-react-native";
import { Card, PressableFeedback } from "heroui-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { StatBox } from "./components/stat-box";

type Props = {
  onEditPress: () => void;
};

export function ProfileHeroCard({ onEditPress }: Props) {
  const { t } = useTranslation();

  return (
    <Card
      className="mb-6 overflow-hidden rounded-3xl border-0 bg-hero p-6 shadow-lg shadow-black/15"
      variant="transparent"
    >
      <View className="flex-row items-start gap-3">
        <View className="relative">
          <View className="size-[72px] overflow-hidden rounded-2xl">
            <Image
              source={{ uri: AVATAR_URI }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
          <View className="absolute -bottom-1 -right-1 size-6 items-center justify-center rounded-full border-2 border-hero bg-success">
            <Check size={12} color="#fff" strokeWidth={3} />
          </View>
        </View>
        <View className="min-w-0 flex-1 justify-center gap-0.5 pt-0.5">
          <Text
            className="text-xl font-bold text-primary-foreground"
            numberOfLines={1}
          >
            {t("profile.name")}
          </Text>
          <Text className="text-sm text-hero-muted" numberOfLines={1}>
            {t("profile.role")}
          </Text>
          <Text className="text-sm text-hero-muted" numberOfLines={1}>
            {t("profile.email")}
          </Text>
        </View>
        <PressableFeedback
          accessibilityLabel={t("profile.editA11y")}
          onPress={onEditPress}
          className="size-10 items-center justify-center rounded-full bg-primary-foreground/15"
        >
          <Pencil size={18} color="#fff" />
        </PressableFeedback>
      </View>

      <View className="mt-5 flex-row gap-2">
        <StatBox value="15" label={t("profile.stats.machines")} />
        <StatBox value="4" label={t("profile.stats.alerts")} />
        <StatBox value="92%" label={t("profile.stats.efficiency")} />
      </View>
    </Card>
  );
}
