import { StyledSafeAreaView } from "@/components/ui/safe-area-view";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

import { ProfileHeroCard } from "./profile-hero-card";
import { ProfileNotificationsSection } from "./profile-notifications-section";
import { ProfilePreferencesSection } from "./profile-preferences-section";
import { ProfileSignOut } from "./profile-sign-out";
import { ProfileSupportSection } from "./profile-support-section";
import { SectionLabel } from "./components/section-label";

export default function ProfileScreen() {
  const { t } = useTranslation();

  const noop = useCallback(() => {}, []);

  return (
    <View className="flex-1 bg-canvas">
      <StyledSafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pb-10 pt-2">
            <SectionLabel>{t("profile.accountLabel")}</SectionLabel>
            <Text className="mb-4 text-3xl font-bold text-navy">
              {t("profile.title")}
            </Text>

            <ProfileHeroCard onEditPress={noop} />
            <ProfileNotificationsSection />
            <ProfilePreferencesSection onSecurityPress={noop} />
            <ProfileSupportSection
              onHelpPress={noop}
              onAboutPress={noop}
              onDeleteAccountPress={noop}
            />
            <ProfileSignOut onPress={noop} />
          </View>
        </ScrollView>
      </StyledSafeAreaView>
    </View>
  );
}
