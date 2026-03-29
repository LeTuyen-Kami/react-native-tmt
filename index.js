import { Platform } from "react-native";

if (Platform.OS !== "web") {
  const {
    getMessaging,
    setBackgroundMessageHandler,
  } = require("@react-native-firebase/messaging");

  setBackgroundMessageHandler(getMessaging(), async (remoteMessage) => {
    console.log("[FCM] Background message handled", remoteMessage);
  });
}

require("expo-router/entry");
