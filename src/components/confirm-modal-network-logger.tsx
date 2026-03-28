// import * as LocalAuthentication from "expo-local-authentication";
// import { useEffect, useRef, useState } from "react";
// import { Platform, Switch, View } from "react-native";

// function biometricLabel(
//   types: LocalAuthentication.AuthenticationType[]
// ): string {
//   const { AuthenticationType } = LocalAuthentication;
//   const hasFace = types.includes(AuthenticationType.FACIAL_RECOGNITION);
//   const hasFinger = types.includes(AuthenticationType.FINGERPRINT);
//   if (hasFace && hasFinger) {
//     return Platform.OS === "ios" ? "Face ID / Touch ID" : "Khuôn mặt / Vân tay";
//   }
//   if (hasFace) {
//     return Platform.OS === "ios" ? "Face ID" : "Khuôn mặt";
//   }
//   if (hasFinger) {
//     return Platform.OS === "ios" ? "Touch ID" : "Vân tay";
//   }
//   return "Sinh trắc học";
// }

// const ConfirmModalNetworkLogger = () => {
//   const dispatch = useAppDispatch();
//   const { showBottomErrorToast, showTopSuccessToast } = useToast();

//   const isShowNetworkLogger = useAppSelector(selectIsShowFloatNetworkLogger);
//   const currentBaseUrl = useAppSelector(selectCurrentBaseUrl);
//   const devPanelUseBiometric = useAppSelector(selectDevPanelUseBiometric);

//   const [step, setStep] = useState<"password" | "options">("password");
//   const [input, setInput] = useState("");
//   const [bioLoading, setBioLoading] = useState(true);
//   const [bioCapable, setBioCapable] = useState(false);
//   const [bioLabel, setBioLabel] = useState("Sinh trắc học");
//   const [hasHardware, setHasHardware] = useState(false);
//   const [isEnrolled, setIsEnrolled] = useState(false);

//   const autoBiometricStarted = useRef(false);

//   const isDev = currentBaseUrl === API_URL_DEV;

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       try {
//         const hardware = await LocalAuthentication.hasHardwareAsync();
//         const enrolled = await LocalAuthentication.isEnrolledAsync();
//         const types =
//           await LocalAuthentication.supportedAuthenticationTypesAsync();
//         if (cancelled) return;
//         setHasHardware(hardware);
//         setIsEnrolled(enrolled);
//         setBioCapable(hardware && enrolled);
//         setBioLabel(biometricLabel(types));
//       } finally {
//         if (!cancelled) setBioLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   useEffect(() => {
//     if (bioLoading || step !== "password") return;
//     if (!devPanelUseBiometric || !bioCapable) return;
//     if (autoBiometricStarted.current) return;
//     autoBiometricStarted.current = true;

//     let cancelled = false;
//     (async () => {
//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage: "Xác thực để mở Dev panel",
//         cancelLabel: "Hủy",
//         fallbackLabel: "Mật khẩu",
//         disableDeviceFallback: false,
//       });
//       if (cancelled) return;
//       if (result.success) {
//         setStep("options");
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [bioLoading, bioCapable, devPanelUseBiometric, step]);

//   const handleConfirmPassword = () => {
//     if (input === DEV_PANEL_PASSWORD) {
//       setStep("options");
//     } else {
//       showBottomErrorToast({ message: "Mật khẩu không đúng" });
//     }
//   };

//   const handleBiometricOnce = async () => {
//     if (!bioCapable) {
//       showBottomErrorToast({
//         message: "Thiết bị không hỗ trợ hoặc chưa đăng ký sinh trắc học",
//       });
//       return;
//     }
//     const result = await LocalAuthentication.authenticateAsync({
//       promptMessage: "Xác thực để mở Dev panel",
//       cancelLabel: "Hủy",
//       fallbackLabel: "Mật khẩu",
//       disableDeviceFallback: false,
//     });
//     if (result.success) {
//       setStep("options");
//     }
//   };

//   const handleToggleNetworkLogger = () => {
//     const next = !isShowNetworkLogger;
//     dispatch(setShowFloatNetworkLogger(next));
//     showTopSuccessToast({
//       message: next ? "Đã bật Network Logger" : "Đã tắt Network Logger",
//     });
//   };

//   const handleToggleDevPanelBiometric = async (enabled: boolean) => {
//     if (enabled) {
//       if (!bioCapable) {
//         showBottomErrorToast({
//           message: "Bật sinh trắc học trong Cài đặt hệ thống trước",
//         });
//         return;
//       }
//       const result = await LocalAuthentication.authenticateAsync({
//         promptMessage: `Xác nhận dùng ${bioLabel} mở Dev panel`,
//         cancelLabel: "Hủy",
//         disableDeviceFallback: false,
//       });
//       if (!result.success) {
//         showBottomErrorToast({
//           message: "Chưa bật — xác thực không thành công",
//         });
//         return;
//       }
//     }
//     dispatch(setDevPanelUseBiometric(enabled));
//     showTopSuccessToast({
//       message: enabled
//         ? `Lần sau mở panel bằng ${bioLabel}`
//         : "Đã tắt, lần sau dùng mật khẩu",
//     });
//   };

//   const handleToggleEndpoint = async () => {
//     const newUrl: AppBaseUrl = isDev ? API_URL_PROD : API_URL_DEV;
//     await dispatch(authLogout());
//     dispatch(setCurrentBaseUrl(newUrl));
//     updateAxiosBaseUrl(newUrl);
//     ModalController.hideModal();
//     showTopSuccessToast({
//       message: `Đã chuyển sang ${
//         newUrl === API_URL_DEV ? "Dev" : "Production"
//       } và đăng xuất`,
//     });
//   };

//   const biometricHint = !hasHardware
//     ? "Thiết bị không có sinh trắc học"
//     : !isEnrolled
//     ? "Chưa đăng ký Face ID / Touch ID trong Cài đặt"
//     : `Dùng ${bioLabel}`;

//   if (step === "password") {
//     return (
//       <View>
//         <Text style={tw`text-center text-base font-semibold py-4`}>
//           {devPanelUseBiometric && bioCapable
//             ? `Xác thực bằng ${bioLabel}`
//             : "Nhập mật khẩu để tiếp tục"}
//         </Text>
//         {devPanelUseBiometric && bioCapable ? (
//           <Text style={tw`text-center text-xs text-gray-500 px-2 pb-2`}>
//             Hoặc nhập mật khẩu bên dưới nếu cần
//           </Text>
//         ) : null}
//         <Input
//           value={input}
//           onChangeText={setInput}
//           placeholder="Nhập mật khẩu"
//           secureTextEntry
//           style={tw`p-4`}
//           containerStyle={tw`rounded-lg`}
//         />
//         <Button
//           onPress={handleConfirmPassword}
//           isBgPrimary
//           title="Xác nhận"
//           styleContainer={tw`mt-4`}
//         />
//         {bioCapable && !bioLoading ? (
//           <Button
//             onPress={handleBiometricOnce}
//             title={`Dùng ${bioLabel}`}
//             styleContainer={tw`mt-2`}
//           />
//         ) : null}
//       </View>
//     );
//   }

//   return (
//     <View style={tw`pb-2`}>
//       <Text style={tw`text-center text-base font-semibold py-4`}>
//         Tuỳ chọn Dev
//       </Text>

//       {/* Network Logger row */}
//       <View
//         style={tw`flex-row items-center justify-between px-2 py-3 border-b border-gray-100`}
//       >
//         <View style={tw`flex-1`}>
//           <Text style={tw`text-sm font-semibold`}>Network Logger</Text>
//           <Text style={tw`text-xs text-gray-500 mt-0.5`}>
//             {isShowNetworkLogger ? "Đang bật" : "Đang tắt"}
//           </Text>
//         </View>
//         <Switch
//           value={isShowNetworkLogger}
//           onValueChange={handleToggleNetworkLogger}
//         />
//       </View>

//       {/* Biometric quick unlock */}
//       <View
//         style={tw`flex-row items-center justify-between px-2 py-3 border-b border-gray-100`}
//       >
//         <View style={tw`flex-1 pr-2`}>
//           <Text style={tw`text-sm font-semibold`}>
//             Mở panel bằng {bioLabel}
//           </Text>
//           <Text style={tw`text-xs text-gray-500 mt-0.5`}>{biometricHint}</Text>
//         </View>
//         <Switch
//           value={devPanelUseBiometric}
//           disabled={!bioCapable || bioLoading}
//           onValueChange={handleToggleDevPanelBiometric}
//         />
//       </View>

//       {/* Endpoint row */}
//       <View style={tw`flex-row items-center justify-between px-2 py-3`}>
//         <View style={tw`flex-1`}>
//           <Text style={tw`text-sm font-semibold`}>Endpoint</Text>
//           <Text style={tw`text-xs text-gray-500 mt-0.5`} numberOfLines={1}>
//             {isDev ? `Dev: ${API_URL_DEV}` : `Prod: ${API_URL_PROD}`}
//           </Text>
//         </View>
//         <Switch value={isDev} onValueChange={handleToggleEndpoint} />
//       </View>

//       <Button
//         onPress={ModalController.hideModal}
//         title="Đóng"
//         styleContainer={tw`mt-4`}
//       />
//     </View>
//   );
// };

// export default ConfirmModalNetworkLogger;
