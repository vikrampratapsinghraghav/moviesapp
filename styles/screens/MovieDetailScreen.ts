import { StyleSheet } from "react-native";
import { COLORS, DIMENSIONS } from "../../constants/theme";
import { createFlexCenter, createFlexRow, createRounded, createShadow } from "../utils";

export const movieDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
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
  heroSection: {
    height: 300,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  heroYear: {
    fontSize: 16,
    color: "#ffffff",
  },
  heroRuntime: {
    fontSize: 16,
    color: "#ffffff",
  },
  ratingBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
  },
  playButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  playButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  downloadButton: {
    backgroundColor: "rgba(109, 109, 110, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  downloadButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  contentSection: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  plot: {
    fontSize: 16,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  cast: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  director: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreTag: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: DIMENSIONS.spacing.xl,
    paddingVertical: DIMENSIONS.spacing.lg,
    borderRadius: DIMENSIONS.borderRadius.full,
    ...createShadow(4),
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontSize.lg,
    fontWeight: DIMENSIONS.fontWeight.bold,
  },
});
