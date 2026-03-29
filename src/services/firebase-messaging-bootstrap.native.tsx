import {
  AuthorizationStatus,
  getAPNSToken,
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
  registerDeviceForRemoteMessages,
  requestPermission,
  setAPNSToken,
} from "@react-native-firebase/messaging";
import type { RemoteMessage } from "@react-native-firebase/messaging";
import { isDevice } from "expo-device";
import { useToast } from "heroui-native";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

function getForegroundToastContent(message: RemoteMessage): {
  title: string;
  description?: string;
} {
  const n = message.notification;
  const titleFromNotification = n?.title?.trim();
  const bodyFromNotification = n?.body?.trim();

  const data = message.data;
  let titleFromData: string | undefined;
  let bodyFromData: string | undefined;
  if (data && typeof data === "object") {
    const t = data.title;
    const b = data.body;
    titleFromData =
      typeof t === "string" ? t.trim() : undefined;
    bodyFromData = typeof b === "string" ? b.trim() : undefined;
  }

  const title =
    titleFromNotification ||
    titleFromData ||
    (message.messageId ? `Message ${message.messageId.slice(0, 8)}…` : "Notification");

  const description =
    bodyFromNotification ||
    bodyFromData ||
    undefined;

  return { title, description };
}

const messaging = getMessaging();

const isIosSimulator = Platform.OS === "ios" && !isDevice;

/**
 * Token APNs giả (64 ký tự hex = 32 byte) — RNFirebase gợi ý cho Simulator khi không có APNs thật.
 * Không dùng cho push production; chỉ để getToken / flow JS chạy được trên Simulator.
 */
const IOS_SIMULATOR_FAKE_APNS_HEX = "deadbeef".repeat(8);

async function requestAndroidNotificationPermission() {
  if (Platform.OS !== "android" || Platform.Version < 33) {
    return;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );

  console.log("[FCM] Android notification permission", status);
}

/** iOS: FIRMessaging chỉ có APNs token sau khi APNs callback chạy — có thể chậm hơn registerForRemoteNotifications. */
async function waitForApnsToken(maxWaitMs: number): Promise<boolean> {
  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    const apns = await getAPNSToken(messaging);
    if (apns) {
      return true;
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  return false;
}

/** Firebase iOS 10.4+: getToken lỗi nếu APNs chưa gắn; gọi lại sau vài trăm ms (theo gợi ý I-FCM002022). */
async function getTokenIOSWithRetry(): Promise<string | null> {
  const attempts = 36;
  const delayMs = 500;
  let lastError: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      return await getToken(messaging);
    } catch (e) {
      lastError = e;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }

  console.warn("[FCM] getToken gave up after retries", lastError);
  return null;
}

async function bootstrapFirebaseMessaging() {
  await requestAndroidNotificationPermission();

  const authorizationStatus = await requestPermission(messaging);

  if (Platform.OS === "ios") {
    if (
      authorizationStatus !== AuthorizationStatus.AUTHORIZED &&
      authorizationStatus !== AuthorizationStatus.PROVISIONAL
    ) {
      console.log("[FCM] Skipping token: notification permission not granted");
      return;
    }

    await registerDeviceForRemoteMessages(messaging);

    if (isIosSimulator) {
      await setAPNSToken(
        messaging,
        IOS_SIMULATOR_FAKE_APNS_HEX,
        "sandbox"
      );
      console.log(
        "[FCM] Simulator: setAPNSToken (sandbox, hex giả) — push thật vẫn cần máy thật"
      );
      try {
        const token = await getToken(messaging);
        console.log("[FCM] Authorization status", authorizationStatus);
        console.log("[FCM] Token", token);
      } catch (error) {
        console.warn("[FCM] getToken sau setAPNSToken (Simulator)", error);
      }
      return;
    }

    const apnsReady = await waitForApnsToken(15_000);
    if (!apnsReady) {
      console.warn(
        "[FCM] getAPNSToken still empty; will retry getToken (Simulator/device may set APNs slightly later)"
      );
    }

    const token = await getTokenIOSWithRetry();
    console.log("[FCM] Authorization status", authorizationStatus);
    if (token) {
      console.log("[FCM] Token", token);
    } else {
      console.warn(
        "[FCM] No FCM token yet — check physical device + APNs key in Firebase; Simulator needs iOS 16+ on Apple Silicon"
      );
    }
    return;
  }

  try {
    const token = await getToken(messaging);
    console.log("[FCM] Authorization status", authorizationStatus);
    console.log("[FCM] Token", token);
  } catch (error) {
    console.warn("[FCM] getToken failed", error);
  }
}

export default function FirebaseMessagingBootstrap() {
  const { toast } = useToast();

  useEffect(() => {
    bootstrapFirebaseMessaging().catch((error) => {
      console.log("[FCM] Bootstrap failed", error);
    });

    const unsubscribeOnMessage = onMessage(messaging, (remoteMessage) => {
      const { title, description } = getForegroundToastContent(remoteMessage);
      if (description) {
        toast.show({
          variant: "default",
          placement: "top",
          label: title,
          description,
        });
      } else {
        toast.show(title);
      }
    });

    const unsubscribeOnNotificationOpenedApp = onNotificationOpenedApp(
      messaging,
      (remoteMessage) => {
        console.log("[FCM] Notification opened app", remoteMessage);
      }
    );

    getInitialNotification(messaging)
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("[FCM] Initial notification", remoteMessage);
        }
      })
      .catch((error) => {
        console.log("[FCM] Failed to read initial notification", error);
      });

    const unsubscribeOnTokenRefresh = onTokenRefresh(messaging, (token) => {
      console.log("[FCM] Token refreshed", token);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnTokenRefresh();
    };
  }, [toast]);

  return null;
}
