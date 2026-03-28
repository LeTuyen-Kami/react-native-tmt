import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const supportedLanguages = ["vi", "en"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

function detectDeviceLanguage(): SupportedLanguage {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
  return locale.startsWith("en") ? "en" : "vi";
}

const resources = {
  vi: {
    common: {
      tabs: {
        home: "Trang chủ",
        explore: "Khám phá",
        profile: "Hồ sơ",
      },
      status: {
        issue: "Sự cố",
        maintenance: "Bảo trì",
        running: "Đang chạy",
      },
      brand: {
        starter: "Expo Starter",
      },
      login: {
        brandName: "AxisCommand",
        tagline: "EXECUTIVE OPERATIONS",
        welcomeTitle: "Chào mừng trở lại",
        welcomeSubtitle: "Đăng nhập vào bảng điều khiển",
        emailLabel: "ĐỊA CHỈ EMAIL",
        passwordLabel: "MẬT KHẨU",
        emailPlaceholder: "director@company.com",
        rememberMe: "Ghi nhớ đăng nhập",
        forgotPassword: "Quên mật khẩu?",
        signIn: "Đăng nhập",
        footer: "AxisCommand v2.4 · Kết nối an toàn",
      },
      home: {
        title: "Chào mừng đến với Expo",
        gettingStarted: "Bắt đầu",
        tryEditing: "Thử chỉnh sửa",
        devTools: "Công cụ dev",
        freshStart: "Làm mới dự án",
        resetCommand: "bun run reset-project",
        currentLanguage: "Ngôn ngữ hiện tại: {{language}}",
        switchLanguage: "Đổi sang {{language}}",
        languageNames: {
          vi: "Tiếng Việt",
          en: "English",
        },
        devMenu: {
          web: "dùng devtools của trình duyệt",
          devicePrefix: "lắc thiết bị hoặc nhấn ",
          terminalSuffix: " trong terminal",
          pressPrefix: "nhấn ",
        },
        operations: "Vận hành",
        filter: {
          all: "Tất cả",
          filterA11y: "Lọc theo trạng thái",
        },
        issuesCount: "{{count}} sự cố",
        notificationsA11y: "Thông báo",
        machineCard: {
          unitsToday: "SẢN LƯỢNG HÔM NAY",
          efficiency: "HIỆU SUẤT",
          uptime: "THỜI GIAN CHẠY",
          openDetailA11y: "Xem chi tiết",
        },
        summary: {
          overviewLabel: "Tổng quan hôm nay",
          machinesTotal: "{{count}} máy tổng cộng",
          operational: "Đang vận hành",
          issues: "Sự cố",
          maintenance: "Bảo trì",
          activityA11y: "Hoạt động hệ thống",
        },
      },
      explore: {
        title: "Khám phá",
        subtitle: "Starter app này có sẵn ví dụ để bạn bắt đầu nhanh hơn.",
        docs: "Tài liệu Expo",
        learnMore: "Xem thêm",
        sections: {
          routing: "Routing theo file",
          support: "Hỗ trợ Android, iOS và web",
          images: "Hình ảnh",
          themes: "Light mode và dark mode",
          animations: "Animation",
        },
        routingLineOne: "App này có hai màn hình:",
        routingLineTwo: "File layout sau chịu trách nhiệm dựng tab navigator:",
        supportPrefix:
          "Bạn có thể mở project này trên Android, iOS và web. Để mở bản web, nhấn ",
        supportSuffix: " trong terminal đang chạy project.",
        imagesLine:
          "Với ảnh tĩnh, bạn có thể dùng hậu tố @2x và @3x cho các mật độ màn hình khác nhau.",
        themesLine:
          "Template này có hỗ trợ light mode và dark mode. Hook useColorScheme() cho phép bạn đọc color scheme hiện tại của người dùng để điều chỉnh UI.",
        animationsLine:
          "Template này có sẵn ví dụ về animated component. Component src/components/ui/collapsible.tsx dùng react-native-reanimated để animate phần mở rộng này.",
      },
      profile: {
        accountLabel: "TÀI KHOẢN",
        title: "Hồ sơ",
        name: "Robert Langford",
        role: "Giám đốc vận hành",
        email: "r.langford@company.com",
        editA11y: "Chỉnh sửa hồ sơ",
        stats: {
          machines: "MÁY",
          alerts: "CẢNH BÁO",
          efficiency: "HIỆU SUẤT",
        },
        notifications: {
          section: "THÔNG BÁO",
          enable: {
            title: "Bật thông báo",
            subtitle: "Cảnh báo hệ thống và cập nhật",
          },
          critical: {
            title: "Cảnh báo khẩn cấp",
            subtitle: "Thông báo sự cố ngay lập tức",
          },
          maintenance: {
            title: "Nhắc bảo trì",
            subtitle: "Cảnh báo lịch bảo trì",
          },
        },
        preferences: {
          section: "TÙY CHỌN",
          appearance: {
            title: "Giao diện",
            subtitle: "Sáng, tối hoặc theo hệ thống",
          },
          theme: {
            light: "Sáng",
            dark: "Tối",
            system: "Theo hệ thống",
          },
          language: {
            title: "Ngôn ngữ",
          },
          lang: {
            vi: "Tiếng Việt",
            en: "English",
          },
          security: {
            title: "Bảo mật",
            subtitle: "PIN, sinh trắc học",
          },
        },
        support: {
          section: "HỖ TRỢ",
          help: {
            title: "Trợ giúp & hỗ trợ",
            subtitle: "Tài liệu & liên hệ",
          },
          about: {
            title: "Giới thiệu",
            subtitle: "AxisCommand v2.4.1",
          },
          deleteAccount: {
            title: "Xóa tài khoản",
            subtitle: "Xóa vĩnh viễn tài khoản và dữ liệu",
          },
        },
        deleteAccount: "Xóa tài khoản",
        deleteAccountSheet: {
          title: "Xóa tài khoản?",
          description:
            "Tài khoản và dữ liệu sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác.",
        },
        deleteAccountStack: {
          openInputSheet: "Mở sheet nhập liệu (xếp chồng)",
          inputTitle: "Sheet lồng — nhập thử",
          inputLabel: "Ô nhập (test keyboard + stack)",
          inputPlaceholder: "Gõ gì đó…",
          submit: "Xác nhận và đóng cả hai sheet",
        },
        signOut: "Đăng xuất",
        signOutSheet: {
          title: "Đăng xuất",
          description: "Bạn sẽ được chuyển về màn hình đăng nhập.",
        },
      },
    },
  },
  en: {
    common: {
      tabs: {
        home: "Home",
        explore: "Explore",
        profile: "Profile",
      },
      status: {
        issue: "Issue",
        maintenance: "Maintenance",
        running: "Running",
      },
      brand: {
        starter: "Expo Starter",
      },
      login: {
        brandName: "AxisCommand",
        tagline: "EXECUTIVE OPERATIONS",
        welcomeTitle: "Welcome back",
        welcomeSubtitle: "Sign in to your dashboard",
        emailLabel: "EMAIL ADDRESS",
        passwordLabel: "PASSWORD",
        passwordPlaceholder: "Enter your password",
        emailPlaceholder: "director@company.com",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        signIn: "Sign In",
        footer: "AxisCommand v2.4 · Secure Connection",
      },
      home: {
        title: "Welcome to Expo",
        gettingStarted: "Get started",
        tryEditing: "Try editing",
        devTools: "Dev tools",
        freshStart: "Fresh start",
        resetCommand: "bun run reset-project",
        currentLanguage: "Current language: {{language}}",
        switchLanguage: "Switch to {{language}}",
        languageNames: {
          vi: "Vietnamese",
          en: "English",
        },
        devMenu: {
          web: "use browser devtools",
          devicePrefix: "shake device or press ",
          terminalSuffix: " in terminal",
          pressPrefix: "press ",
        },
        operations: "Operations",
        filter: {
          all: "All",
          filterA11y: "Filter by status",
        },
        issuesCount: "{{count}} Issues",
        notificationsA11y: "Notifications",
        machineCard: {
          unitsToday: "UNITS TODAY",
          efficiency: "EFFICIENCY",
          uptime: "UPTIME",
          openDetailA11y: "Open detail",
        },
        summary: {
          overviewLabel: "Today's overview",
          machinesTotal: "{{count}} machines total",
          operational: "Operational",
          issues: "Issues",
          maintenance: "Maintenance",
          activityA11y: "System activity",
        },
      },
      explore: {
        title: "Explore",
        subtitle:
          "This starter app includes example code to help you get started.",
        docs: "Expo documentation",
        learnMore: "Learn more",
        sections: {
          routing: "File-based routing",
          support: "Android, iOS, and web support",
          images: "Images",
          themes: "Light and dark mode components",
          animations: "Animations",
        },
        routingLineOne: "This app has two screens:",
        routingLineTwo: "The layout file that sets up the tab navigator is:",
        supportPrefix:
          "You can open this project on Android, iOS, and the web. To open the web version, press ",
        supportSuffix: " in the terminal running this project.",
        imagesLine:
          "For static images, you can use the @2x and @3x suffixes to provide files for different screen densities.",
        themesLine:
          "This template has light and dark mode support. The useColorScheme() hook lets you inspect the user's current color scheme so you can adjust UI colors accordingly.",
        animationsLine:
          "This template includes an example of an animated component. The src/components/ui/collapsible.tsx component uses react-native-reanimated to animate opening this hint.",
      },
      profile: {
        accountLabel: "ACCOUNT",
        title: "Profile",
        name: "Robert Langford",
        role: "Operations Director",
        email: "r.langford@company.com",
        editA11y: "Edit profile",
        stats: {
          machines: "MACHINES",
          alerts: "ALERTS",
          efficiency: "EFFICIENCY",
        },
        notifications: {
          section: "NOTIFICATIONS",
          enable: {
            title: "Enable Notifications",
            subtitle: "System alerts and updates",
          },
          critical: {
            title: "Critical Alerts",
            subtitle: "Immediate issue notifications",
          },
          maintenance: {
            title: "Maintenance Reminders",
            subtitle: "Scheduled service alerts",
          },
        },
        preferences: {
          section: "PREFERENCES",
          appearance: {
            title: "Appearance",
            subtitle: "Light, dark, or match system",
          },
          theme: {
            light: "Light",
            dark: "Dark",
            system: "System",
          },
          language: {
            title: "Language",
          },
          lang: {
            vi: "Vietnamese",
            en: "English",
          },
          security: {
            title: "Security",
            subtitle: "PIN, biometrics",
          },
        },
        support: {
          section: "SUPPORT",
          help: {
            title: "Help & Support",
            subtitle: "Documentation & contact",
          },
          about: {
            title: "About",
            subtitle: "AxisCommand v2.4.1",
          },
          deleteAccount: {
            title: "Delete account",
            subtitle: "Permanently remove your account and data",
          },
        },
        deleteAccount: "Delete account",
        deleteAccountSheet: {
          title: "Delete account?",
          description:
            "Your account and data will be permanently deleted. This cannot be undone.",
        },
        deleteAccountStack: {
          openInputSheet: "Open input sheet (stacked)",
          inputTitle: "Nested sheet — try typing",
          inputLabel: "Input (test keyboard + stack)",
          inputPlaceholder: "Type something…",
          submit: "Confirm and close both sheets",
        },
        signOut: "Sign Out",
        signOutSheet: {
          title: "Sign Out",
          description: "You will be returned to the login screen.",
        },
      },
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: detectDeviceLanguage(),
  fallbackLng: "vi",
  supportedLngs: supportedLanguages,
  resources,
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export async function changeLanguage(language: SupportedLanguage) {
  await i18n.changeLanguage(language);
}

export default i18n;
