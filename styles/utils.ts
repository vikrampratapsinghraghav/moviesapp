import { ViewStyle, TextStyle } from 'react-native';
import { COLORS, DIMENSIONS } from '../constants/theme';

export const createShadow = (elevation: number = 5): ViewStyle => ({
  elevation,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
});

export const createFlexCenter = (): ViewStyle => ({
  alignItems: 'center',
  justifyContent: 'center',
});

export const createFlexRow = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
});

export const createTextStyle = (
  size: keyof typeof DIMENSIONS.fontSize,
  weight: keyof typeof DIMENSIONS.fontWeight = 'normal',
  color: string = COLORS.textPrimary
): TextStyle => ({
  fontSize: DIMENSIONS.fontSize[size],
  fontWeight: DIMENSIONS.fontWeight[weight],
  color,
});

export const createRounded = (
  radius: keyof typeof DIMENSIONS.borderRadius = 'md'
): ViewStyle => ({
  borderRadius: DIMENSIONS.borderRadius[radius],
});

export const createBackground = (color: string = COLORS.background): ViewStyle => ({
  backgroundColor: color,
});
