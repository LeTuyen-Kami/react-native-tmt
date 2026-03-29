import "@/i18n/config";
import "../../global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useThemePreferenceSync } from "@/hooks/use-theme-preference-sync";
import QueryClientProvider from "@/providers/query-client-prodiver";
import StateManagementProvider from "@/providers/state-management-provider";
import FirebaseMessagingBootstrap from "@/services/firebase-messaging-bootstrap";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

function ThemePreferenceSync() {
  useThemePreferenceSync();
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <StateManagementProvider>
      <ThemePreferenceSync />
      <QueryClientProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AnimatedSplashOverlay />
          <KeyboardProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <HeroUINativeProvider>
                <FirebaseMessagingBootstrap />
                <Stack screenOptions={{ headerShown: true }}>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="(auth)/login"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </HeroUINativeProvider>
            </GestureHandlerRootView>
          </KeyboardProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StateManagementProvider>
  );
}
