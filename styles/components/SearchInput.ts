import { StyleSheet } from "react-native";
import { COLORS, DIMENSIONS } from "../../constants/theme";
import { createRounded, createShadow } from "../utils";

export const searchInputStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: DIMENSIONS.spacing.md,
    marginVertical: DIMENSIONS.spacing.sm,
    borderRadius: DIMENSIONS.borderRadius.lg,
    ...createShadow(2),
  },
  input: {
    padding: DIMENSIONS.spacing.md,
    fontSize: DIMENSIONS.fontSize.md,
    color: COLORS.textPrimary,
  },
  loadingContainer: {
    position: "absolute",
    right: DIMENSIONS.spacing.md,
    top: DIMENSIONS.spacing.md,
  },
});
