# AGENTS.md — Hướng dẫn cho AI / agent

Tài liệu này mô tả **tmt**: ứng dụng đa nền tảng (Android, iOS, web) dựa trên Expo, phát triển chủ yếu bằng TypeScript và React Native.

## Tổng quan

| Mục | Giá trị |
| --- | --- |
| Tên package | `tmt` |
| Entry | `expo-router/entry` |
| Expo SDK | ~55 |
| React / RN | 19.2 / 0.83 |
| Scheme / bundle | `tmt`, `com.letuyen1277.tmt` |
| Web | static export (`app.json` → `web.output`) |

Ứng dụng dùng **expo-router** (file-based routing), **typed routes** và **React Compiler** (bật trong `app.json` → `experiments`).

## Công cụ & package manager

- **Dùng Bun** cho cài đặt và script (`bun install`, `bun run …`), không dùng npm theo mặc định.

## Cấu trúc thư mục quan trọng

- `src/app/` — Màn hình và layout router (`_layout.tsx`, `index.tsx`, `explore.tsx`).
- `src/components/` — Component dùng chung (tabs, themed UI, network logger, v.v.).
- `src/providers/` — `QueryClientProvider` (TanStack Query), `StateManagementProvider` (Jotai).
- `src/stores/` — Atom / store Jotai (`jotai-store.ts`).
- `src/i18n/` — Cấu hình i18next + bản dịch nhúng (vi / en).
- `src/constants/` — Theme, màu.
- `src/hooks/` — Hook tùy chỉnh (color scheme, theme, tap, …).
- `src/utils/` — Tiện ích (`helper.ts`).
- `assets/` — Ảnh, icon tab, v.v.
- `global.css` — Entry CSS cho **Uniwind** (Tailwind trên RN).
- `metro.config.js` — Metro + `withUniwindConfig` (`cssEntryFile: ./global.css`, types `./src/uniwind-types.d.ts`).

## Alias import (TypeScript)

- `@/*` → `./src/*`
- `@/assets/*` → `./assets/*`

## Stack chính

- **Điều hướng**: expo-router (`NativeTabs` trên native; có `app-tabs.web.tsx` cho web).
- **UI**: HeroUI Native (`HeroUINativeProvider` trong `_layout.tsx`), React Navigation theme (light/dark).
- **Style**: Uniwind + Tailwind CSS 4, `tailwind-merge`, `tailwind-variants`, `clsx`.
- **Dữ liệu / HTTP**: `@tanstack/react-query`, `axios`.
- **State**: Jotai (qua provider trong repo).
- **i18n**: `i18next`, `react-i18next` — namespace `common`, ngôn ngữ `vi` / `en`, fallback `vi`.
- **Animation / gesture**: `react-native-reanimated`, `react-native-gesture-handler`.
- **Khác**: `@shopify/flash-list`, `@gorhom/bottom-sheet`, `expo-image`, `sonner-native`, `react-native-network-logger` (có component floating logger trong dev).

## Script npm/bun

- `bun run start` — `expo start`
- `bun run android` / `ios` / `web` — chạy nền tảng tương ứng
- `bun run lint` — `expo lint`
- `bun run prebuild` — `expo prebuild`
- `bun run reset-project` — script reset template (`scripts/reset-project.js`)

## Quy ước khi chỉnh sửa

1. Giữ nhất quán với pattern hiện có: import `@/`, provider bọc ngoài trong `_layout.tsx`, dịch chuỗi UI qua i18n khi thêm text người dùng.
2. File provider query client đặt tên **`query-client-prodiver.tsx`** (typo trong tên file) — khi import, dùng đúng path hiện tại để tránh gãy build.
3. Web có file `.web.tsx` tách khi cần (ví dụ `app-tabs.web.tsx`, `animated-icon.web.tsx`, `use-color-scheme.web.ts`).

## Tài liệu thư viện (cập nhật)

Khi cần API/docs mới nhất của thư viện, ưu tiên tra **Context7** (MCP) theo quy ước dự án.
