import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MovieListItem } from '../../types/Movie';
import { COLORS, DIMENSIONS, LAYOUT } from '../../constants/theme';
import Button from '../ui/Button';

interface HeroBannerProps {
  movie: MovieListItem;
  onPress: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: movie.poster }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {movie.plot}
          </Text>
          <View style={styles.buttons}>
            <Button
              title="▶ Play"
              onPress={() => {}}
              variant="primary"
              size="medium"
              style={styles.playButton}
            />
            <Button
              title="ℹ More Info"
              onPress={() => {}}
              variant="secondary"
              size="medium"
              style={styles.infoButton}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: LAYOUT.heroHeight,
    marginBottom: DIMENSIONS.spacing.xl,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.overlay,
    padding: DIMENSIONS.spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: DIMENSIONS.fontSize.massive,
    fontWeight: DIMENSIONS.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.spacing.sm,
  },
  description: {
    fontSize: DIMENSIONS.fontSize.lg,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.spacing.lg,
    lineHeight: 22,
  },
  buttons: {
    flexDirection: 'row',
    gap: DIMENSIONS.spacing.md,
  },
  playButton: {
    flex: 1,
  },
  infoButton: {
    flex: 1,
  },
});

export default HeroBanner;
