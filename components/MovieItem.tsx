import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MovieListItem } from '../types/Movie';

interface MovieItemProps {
  movie: MovieListItem;
  onPress: () => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
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
    color: '#ffffff',
    marginBottom: 4,
  },
  year: {
    fontSize: 16,
    color: '#ffd700',
    marginBottom: 4,
  },
  director: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 4,
  },
  genre: {
    fontSize: 12,
    color: '#888888',
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
    color: '#aaaaaa',
    lineHeight: 16,
  },
});

export default MovieItem;
