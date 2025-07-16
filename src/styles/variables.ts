import { StyleProp, TextStyle } from 'react-native';

export const COLORS = {
    success: "#10B981",
    destructive: "#EF4444",
    warning: "#F59E0B",

    primary: "#FFA500",
    primaryLight: "#FFB733",
    primaryDark: "#CC8400",

    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",

    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
};

export const SPACING = {
    // Based on 4dp increments
    xxSmall: 4, // 0.25rem
    xSmall: 8, // 0.5rem
    small: 12, // 0.75rem
    medium: 16, // 1rem
    large: 24, // 1.5rem
    xLarge: 32, // 2rem
    xxLarge: 40, // 2.5rem
    xxxLarge: 48, // 3rem
} as const;

export const FONT_SIZE = {
    displayLarge: 57,
    displayMedium: 45,
    displaySmall: 36,

    headingXL: 48,
    headlineLarge: 36,
    headlineMedium: 28,
    headlineSmall: 24,

    titleLarge: 22,
    titleMedium: 16,
    titleSmall: 14,

    bodyLarge: 18,
    bodyMedium: 16,
    bodySmall: 14,

    labelLarge: 14,
    labelMedium: 12,
    labelSmall: 11,
} as const;

export const FONT_WEIGHT = {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
} as const;

export const TEXT_STYLES: Record<string, StyleProp<TextStyle>> = {
    displayLarge: {
        fontSize: FONT_SIZE.displayLarge,
        lineHeight: 64,
        fontWeight: FONT_WEIGHT.regular,
    },
    displayMedium: {
        fontSize: FONT_SIZE.displayMedium,
        lineHeight: 52,
        fontWeight: FONT_WEIGHT.regular,
    },
    displaySmall: {
        fontSize: FONT_SIZE.displaySmall,
        lineHeight: 44,
        fontWeight: FONT_WEIGHT.regular,
    },

    headingXL: {
        fontSize: FONT_SIZE.headingXL,
        lineHeight: 56,
        fontWeight: FONT_WEIGHT.bold,
    },
    headlineLarge: {
        fontSize: FONT_SIZE.headlineLarge,
        lineHeight: 40,
        fontWeight: FONT_WEIGHT.semiBold,
    },
    headlineMedium: {
        fontSize: FONT_SIZE.headlineMedium,
        lineHeight: 36,
        fontWeight: FONT_WEIGHT.semiBold,
    },
    headlineSmall: {
        fontSize: FONT_SIZE.headlineSmall,
        lineHeight: 32,
        fontWeight: FONT_WEIGHT.semiBold,
    },

    titleLarge: {
        fontSize: FONT_SIZE.titleLarge,
        lineHeight: 28,
        fontWeight: FONT_WEIGHT.medium,
    },
    titleMedium: {
        fontSize: FONT_SIZE.titleMedium,
        lineHeight: 24,
        fontWeight: FONT_WEIGHT.medium,
    },
    titleSmall: {
        fontSize: FONT_SIZE.titleSmall,
        lineHeight: 20,
        fontWeight: FONT_WEIGHT.medium,
    },

    bodyLarge: {
        fontSize: FONT_SIZE.bodyLarge,
        lineHeight: 24,
        fontWeight: FONT_WEIGHT.regular,
    },
    bodyMedium: {
        fontSize: FONT_SIZE.bodyMedium,
        lineHeight: 20,
        fontWeight: FONT_WEIGHT.regular,
    },
    bodySmall: {
        fontSize: FONT_SIZE.bodySmall,
        lineHeight: 16,
        fontWeight: FONT_WEIGHT.regular,
    },

    labelLarge: {
        fontSize: FONT_SIZE.labelLarge,
        lineHeight: 20,
        fontWeight: FONT_WEIGHT.medium,
    },
    labelMedium: {
        fontSize: FONT_SIZE.labelMedium,
        lineHeight: 16,
        fontWeight: FONT_WEIGHT.medium,
    },
    labelSmall: {
        fontSize: FONT_SIZE.labelSmall,
        lineHeight: 16,
        fontWeight: FONT_WEIGHT.medium,
    },
} as const;

export const RADIUS = {
    xSmall: 4,
    small: 8,
    medium: 12,
    large: 16,
    xLarge: 28,
} as const;

export const BREAKPOINTS = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    tabletL: 1024,
    laptopS: 1280,
    laptopM: 1366,
    laptopL: 1440,
    desktop: 1920,
    desktopL: 2560,
} as const;
