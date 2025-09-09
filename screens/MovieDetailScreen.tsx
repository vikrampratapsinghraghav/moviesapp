import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Movie } from '../types/Movie';
import { ApiService } from '../services/api';

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

const MovieDetailScreen: React.FC = () => {
  const route = useRoute<MovieDetailScreenRouteProp>();
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      setError(null);
      const data = await ApiService.fetchMovieById(movieId);
      setMovie(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movie details';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffd700" />
        <Text style={styles.loadingText}>Loading movie details...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Movie not found'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Poster and Basic Info */}
        <View style={styles.header}>
          <View style={styles.posterContainer}>
            {movie.poster ? (
              <Image source={{ uri: movie.poster }} style={styles.poster} />
            ) : (
              <View style={styles.placeholderPoster}>
                <Text style={styles.placeholderText}>No Image</Text>
              </View>
            )}
          </View>
          <View style={styles.basicInfo}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
            {movie.director !== 'N/A' && (
              <Text style={styles.director}>Director: {movie.director}</Text>
            )}
            {movie.rating > 0 && (
              <Text style={styles.rating}>⭐ {movie.rating.toFixed(1)}/10</Text>
            )}
            {movie.imdbVotes && (
              <Text style={styles.votes}>Votes: {parseInt(movie.imdbVotes).toLocaleString()}</Text>
            )}
          </View>
        </View>

        {/* Plot */}
        {movie.plot && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plot</Text>
            <Text style={styles.sectionContent}>{movie.plot}</Text>
          </View>
        )}

        {/* Genre */}
        {movie.genre && movie.genre.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Genre</Text>
            <Text style={styles.sectionContent}>{movie.genre.join(', ')}</Text>
          </View>
        )}

        {/* Runtime */}
        {movie.runtime && movie.runtime !== 'N/A' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Runtime</Text>
            <Text style={styles.sectionContent}>{movie.runtime}</Text>
          </View>
        )}

        {/* Language */}
        {movie.language && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Language</Text>
            <Text style={styles.sectionContent}>{movie.language.toUpperCase()}</Text>
          </View>
        )}

        {/* Country */}
        {movie.country && movie.country !== 'N/A' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Country</Text>
            <Text style={styles.sectionContent}>{movie.country}</Text>
          </View>
        )}

        {/* Production */}
        {movie.production && movie.production !== 'N/A' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Production</Text>
            <Text style={styles.sectionContent}>{movie.production}</Text>
          </View>
        )}

        {/* Box Office */}
        {movie.boxOffice && movie.boxOffice !== 'N/A' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Box Office</Text>
            <Text style={styles.sectionContent}>{movie.boxOffice}</Text>
          </View>
        )}

        {/* Website */}
        {movie.website && movie.website !== 'N/A' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Website</Text>
            <Text style={styles.sectionContent}>{movie.website}</Text>
          </View>
        )}

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <Text style={styles.sectionContent}>
            Type: {movie.type}
          </Text>
          {movie.response && (
            <Text style={styles.sectionContent}>
              Status: {movie.response}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    color: '#111111',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  posterContainer: {
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
  },
  placeholderPoster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  basicInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 8,
    lineHeight: 28,
  },
  year: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 8,
  },
  director: {
    fontSize: 16,
    color: '#444444',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#ffd700',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  votes: {
    fontSize: 14,
    color: '#ffd700',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#111111',
    lineHeight: 24,
  },
});

export default MovieDetailScreen;
