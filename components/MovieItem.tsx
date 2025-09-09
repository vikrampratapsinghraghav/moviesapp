import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { MovieListItem } from '../types/Movie';

interface MovieItemProps {
  movie: MovieListItem;
  onPress: () => void;
  isScrolling?: boolean;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onPress, isScrolling = false }) => {
  const scale = useRef(new Animated.Value(0.95)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale]);

  const handlePressIn = () => {
    if (isScrolling) return;
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start(() => {
      if (!isScrolling) {
        onPress();
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.container, { transform: [{ scale }], opacity }]}>
        <View style={styles.content}>
          <View style={styles.posterContainer}>
            {movie.poster ? (
              <Image source={{ uri: movie.poster }} style={styles.poster} />
            ) : (
              <View style={styles.placeholderPoster}>
                <Text style={styles.placeholderText}>No Image</Text>
              </View>
            )}
          </View>
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={2}>
              {movie.title}
            </Text>
            <Text style={styles.year}>{movie.year}</Text>
            {movie.director !== 'N/A' && (
              <Text style={styles.director} numberOfLines={1}>
                Director: {movie.director}
              </Text>
            )}
            {movie.genre.length > 0 && (
              <Text style={styles.genre} numberOfLines={1}>
                {movie.genre.join(', ')}
              </Text>
            )}
            {movie.rating > 0 && (
              <Text style={styles.rating}>⭐ {movie.rating.toFixed(1)}</Text>
            )}
            {movie.plot && (
              <Text style={styles.plot} numberOfLines={2}>
                {movie.plot}
              </Text>
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: 'row',
    padding: 12,
  },
  posterContainer: {
    marginRight: 12,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  placeholderPoster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 4,
  },
  year: {
    fontSize: 16,
    color: '#ffd700',
    marginBottom: 4,
  },
  director: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 4,
  },
  genre: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#ffd700',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  plot: {
    fontSize: 12,
    color: '#555555',
    lineHeight: 16,
  },
});

export default MovieItem;
