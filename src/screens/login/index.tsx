import { isIOS } from "@/utils/constants";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { ScrollView } from "react-native-gesture-handler";

import {
  Button,
  Card,
  Checkbox,
  cn,
  InputGroup,
  Label,
  LinkButton,
  TextField,
} from "heroui-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { StyledSafeAreaView } from "@/components/ui/safe-area-view";

const NAVY = "#1a2d4a";
const ICON_MUTED = "#8E95A4";
const SIGN_IN_BG = "#9BA8BC";

export default function LoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const goToApp = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <View className="flex-1 bg-[#EEF1F5]">
      <StyledSafeAreaView className="flex-1">
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ScrollViewComponent={ScrollView}
        >
          <View className="w-full max-w-[420px] self-center items-center gap-6">
            <View className="items-center gap-2">
              <View className="rounded-2xl bg-white px-3 py-3 shadow-sm shadow-black/10">
                <SymbolView
                  name={{
                    ios: "chart.bar.doc.horizontal",
                    android: "bar_chart",
                    web: "bar_chart",
                  }}
                  size={32}
                  tintColor={NAVY}
                  resizeMode="scaleAspectFit"
                />
              </View>
              <Text className="text-2xl font-bold tracking-tight text-[#1a2d4a]">
                {t("login.brandName")}
              </Text>
              <Text
                className="text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: "#9CA3AF" }}
              >
                {t("login.tagline")}
              </Text>
            </View>

            <Card className="w-full rounded-3xl border border-zinc-200/80 bg-white px-1 py-1 shadow-lg shadow-black/10">
              <Card.Body className="gap-5 px-5 py-6">
                <View className="gap-1">
                  <Card.Title className="text-xl font-bold text-[#1a2d4a]">
                    {t("login.welcomeTitle")}
                  </Card.Title>
                  <Card.Description className="text-sm text-zinc-500">
                    {t("login.welcomeSubtitle")}
                  </Card.Description>
                </View>

                <TextField className="gap-2">
                  <Label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    {t("login.emailLabel")}
                  </Label>
                  <InputGroup>
                    <InputGroup.Prefix isDecorative>
                      <SymbolView
                        name={{
                          ios: "envelope",
                          android: "mail",
                          web: "mail",
                        }}
                        size={20}
                        tintColor={ICON_MUTED}
                        resizeMode="scaleAspectFit"
                      />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder={t("login.emailPlaceholder")}
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      className={cn(
                        isIOS ? "text-base leading-0" : "text-base",
                        "text-zinc-900"
                      )}
                    />
                  </InputGroup>
                </TextField>

                <TextField className="gap-2">
                  <Label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    {t("login.passwordLabel")}
                  </Label>
                  <InputGroup>
                    <InputGroup.Prefix className="pl-3" isDecorative>
                      <SymbolView
                        name={{
                          ios: "lock",
                          android: "lock",
                          web: "lock",
                        }}
                        size={20}
                        tintColor={ICON_MUTED}
                        resizeMode="scaleAspectFit"
                      />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder={t("login.passwordPlaceholder")}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      // className={cn(
                      //   isIOS ? "text-base leading-0" : "text-base",
                      //   "text-zinc-900"
                      // )}
                    />
                    <InputGroup.Suffix className="pr-2">
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onPress={() => setShowPassword((v) => !v)}
                        className="rounded-lg p-2 active:opacity-70"
                      >
                        <SymbolView
                          name={{
                            ios: showPassword ? "eye.slash" : "eye",
                            android: "visibility",
                            web: "visibility",
                          }}
                          size={20}
                          tintColor={ICON_MUTED}
                          resizeMode="scaleAspectFit"
                        />
                      </Pressable>
                    </InputGroup.Suffix>
                  </InputGroup>
                </TextField>

                <View className="flex-row items-center justify-between gap-3">
                  <View className="min-w-0 flex-1 flex-row items-center gap-2">
                    <Checkbox
                      isSelected={remember}
                      onSelectedChange={setRemember}
                    />
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => setRemember((v) => !v)}
                      className="shrink py-1 active:opacity-80"
                    >
                      <Text className="text-sm text-zinc-500">
                        {t("login.rememberMe")}
                      </Text>
                    </Pressable>
                  </View>
                  <LinkButton
                    onPress={() => {}}
                    className="px-0 py-0"
                    hitSlop={8}
                  >
                    <LinkButton.Label className="text-sm font-medium text-[#1a2d4a]">
                      {t("login.forgotPassword")}
                    </LinkButton.Label>
                  </LinkButton>
                </View>

                <Button
                  size="lg"
                  feedbackVariant="scale-highlight"
                  className="mt-1 w-full rounded-full border-0"
                  style={{ backgroundColor: SIGN_IN_BG }}
                  onPress={goToApp}
                >
                  <Button.Label className="font-semibold text-white">
                    {t("login.signIn")}
                  </Button.Label>
                </Button>
              </Card.Body>
            </Card>

            <Text className="text-center text-xs text-zinc-400">
              {t("login.footer")}
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </StyledSafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
});
