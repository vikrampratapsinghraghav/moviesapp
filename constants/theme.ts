export const COLORS = {
  // Primary colors
  primary: "#e50914",
  primaryDark: "#b81d13",
  
  // Background colors
  background: "#141414",
  backgroundSecondary: "#2a2a2a",
  backgroundTertiary: "#404040",
  cardBackground: "#2a2a2a",
  
  // Text colors
  textPrimary: "#ffffff",
  textSecondary: "#b3b3b3",
  textTertiary: "#8c8c8c",
  
  // UI colors
  overlay: "rgba(0,0,0,0.6)",
  overlayLight: "rgba(0,0,0,0.3)",
  border: "#404040",
  borderLight: "#e2e8f0",
  accent: "#e50914",
  white: "#ffffff",
  
  // Status colors
  success: "#4caf50",
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
} as const;

export const DIMENSIONS = {
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
  
  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 32,
    massive: 36,
  },
  
  // Font weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

export const LAYOUT = {
  // Screen dimensions
  screenWidth: 375, // Will be set dynamically
  screenHeight: 812, // Will be set dynamically
  
  // Component dimensions
  heroHeight: 400,
  movieCardWidth: 140,
  movieCardHeight: 200,
  posterWidth: 80,
  posterHeight: 120,
  
  // Header
  headerHeight: 60,
  searchBarHeight: 50,
} as const;

export type ColorKey = keyof typeof COLORS;
export type SpacingKey = keyof typeof DIMENSIONS.spacing;
export type BorderRadiusKey = keyof typeof DIMENSIONS.borderRadius;
export type FontSizeKey = keyof typeof DIMENSIONS.fontSize;
export type FontWeightKey = keyof typeof DIMENSIONS.fontWeight;
