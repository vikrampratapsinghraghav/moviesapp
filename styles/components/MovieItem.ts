import { StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS } from '../../constants/theme';
import { createShadow, createRounded, createFlexRow } from '../utils';

export const movieItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: DIMENSIONS.spacing.md,
    marginVertical: DIMENSIONS.spacing.sm,
    borderRadius: DIMENSIONS.borderRadius.md,
    ...createShadow(3),
  },
  poster: {
    width: 80,
    height: 120,
    borderTopLeftRadius: DIMENSIONS.borderRadius.md,
    borderBottomLeftRadius: DIMENSIONS.borderRadius.md,
  },
  content: {
    flex: 1,
    padding: DIMENSIONS.spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: DIMENSIONS.fontSize.lg,
    fontWeight: DIMENSIONS.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.spacing.xs,
  },
  year: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: DIMENSIONS.spacing.xs,
  },
  director: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: DIMENSIONS.spacing.xs,
  },
  rating: {
    ...createFlexRow(),
    marginTop: DIMENSIONS.spacing.xs,
  },
  ratingText: {
    fontSize: DIMENSIONS.fontSize.sm,
    color: COLORS.accent,
    marginLeft: DIMENSIONS.spacing.xs,
  },
});
