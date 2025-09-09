import { StyleSheet } from "react-native";
import { COLORS, DIMENSIONS } from "../../constants/theme";
import { createFlexCenter } from "../utils";

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    backgroundColor: COLORS.background,
    paddingTop: DIMENSIONS.spacing.sm,
    paddingBottom: DIMENSIONS.spacing.xs,
    zIndex: 1000,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    ...createFlexCenter(),
    flex: 1,
  },
  errorContainer: {
    ...createFlexCenter(),
    flex: 1,
    padding: DIMENSIONS.spacing.lg,
  },
  errorText: {
    fontSize: DIMENSIONS.fontSize.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: DIMENSIONS.spacing.md,
  },
  retryButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: DIMENSIONS.spacing.lg,
    paddingVertical: DIMENSIONS.spacing.md,
    borderRadius: DIMENSIONS.borderRadius.md,
  },
  retryButtonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.md,
    fontWeight: DIMENSIONS.fontWeight.bold,
  },
});
