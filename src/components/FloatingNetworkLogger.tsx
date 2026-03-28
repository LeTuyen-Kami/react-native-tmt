import { cn } from "@/utils/helper";
import React, { useState } from "react";
import { Dimensions, Platform, Pressable, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import NetworkLogger from "react-native-network-logger";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const BUTTON_SIZE = 56;
const EDGE_PADDING = 16;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimtedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const FloatNetworkLogger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  // Draggable floating button position
  const translateX = useSharedValue(SCREEN_WIDTH - BUTTON_SIZE - EDGE_PADDING);
  const translateY = useSharedValue(
    SCREEN_HEIGHT - BUTTON_SIZE - EDGE_PADDING * 4
  );

  const clamp = (value: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(value, min), max);
  };

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      const maxX = SCREEN_WIDTH - BUTTON_SIZE - EDGE_PADDING;
      const maxY = SCREEN_HEIGHT - BUTTON_SIZE - EDGE_PADDING * 2; // keep above iOS home bar
      translateX.value = clamp(
        translateX.value + e.changeX,
        EDGE_PADDING,
        maxX
      );
      translateY.value = clamp(
        translateY.value + e.changeY,
        EDGE_PADDING,
        maxY
      );
    })
    .onEnd(() => {
      // Snap to nearest horizontal edge for ergonomic reach
      const leftEdge = EDGE_PADDING;
      const rightEdge = SCREEN_WIDTH - BUTTON_SIZE - EDGE_PADDING;
      const mid = SCREEN_WIDTH / 2 - BUTTON_SIZE / 2;
      translateX.value = withSpring(
        translateX.value < mid ? leftEdge : rightEdge,
        { damping: 18, stiffness: 180 }
      );
    });

  const fabStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  if (!isShow) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <AnimtedSafeAreaView
          className={cn("absolute left-0 top-0 right-0 bottom-0 z-9999")}
          entering={FadeInUp}
          exiting={FadeOutDown}
        >
          {/* Backdrop */}
          <Animated.View
            className={cn("absolute left-0 top-0 right-0 bottom-0 bg-black/40")}
            entering={FadeIn}
            exiting={FadeOut}
          />

          {/* Container */}
          <Animated.View className={cn("flex-1")}>
            {/* Header */}
            <Animated.View
              className={cn(
                "flex-row items-center justify-between px-4 py-3 bg-neutral-900"
              )}
            >
              <Text className={cn("text-white text-base font-semibold")}>
                Network Logger
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setIsOpen(false)}
                className={cn(
                  "w-8 h-8 rounded-full items-center justify-center bg-white/10"
                )}
              >
                <Text className={cn("text-white text-base")}>✕</Text>
              </Pressable>
            </Animated.View>

            {/* Content */}
            <Animated.View className={cn("flex-1 bg-white")}>
              <NetworkLogger theme={"dark"} />
            </Animated.View>
          </Animated.View>
        </AnimtedSafeAreaView>
      )}

      {!isOpen && (
        <GestureDetector gesture={panGesture}>
          <Animated.View
            className={cn(
              "absolute w-full h-full rounded-full items-center justify-center bg-indigo-600"
            )}
            style={[
              { width: BUTTON_SIZE, height: BUTTON_SIZE, zIndex: 9999 },
              fabStyle,
            ]}
          >
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsOpen(true)}
              android_ripple={{
                color: "rgba(255,255,255,0.2)",
                borderless: false,
              }}
              className={cn(
                "w-full h-full rounded-full items-center justify-center bg-indigo-600"
              )}
              style={[
                Platform.select({
                  ios: {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                  },
                  android: { elevation: 8 },
                }),
              ]}
            >
              <Text className={cn("text-white text-lg")}>⚡</Text>
            </Pressable>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
};

export default FloatNetworkLogger;
