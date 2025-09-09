import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Movie } from '../types/Movie';
import { ApiService } from '../services/api';

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

const { width: screenWidth } = Dimensions.get('window');

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
        <ActivityIndicator size="large" color="#e50914" />
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: movie.poster }} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{movie.title}</Text>
              <View style={styles.heroMeta}>
                <Text style={styles.heroYear}>{movie.year}</Text>
                <Text style={styles.heroRuntime}>{movie.runtime}</Text>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {movie.rating.toFixed(1)}</Text>
                </View>
              </View>
              <View style={styles.heroButtons}>
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playButtonText}>▶ Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadButtonText}>⬇ Download</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Plot */}
          {movie.plot && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About {movie.title}</Text>
              <Text style={styles.plot}>{movie.plot}</Text>
            </View>
          )}

          {/* Cast */}
          {movie.actors && movie.actors.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cast</Text>
              <Text style={styles.cast}>{movie.actors.join(', ')}</Text>
            </View>
          )}

          {/* Director */}
          {movie.director !== 'N/A' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Director</Text>
              <Text style={styles.director}>{movie.director}</Text>
            </View>
          )}

          {/* Genre */}
          {movie.genre && movie.genre.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Genre</Text>
              <View style={styles.genreContainer}>
                {movie.genre.map((genre, index) => (
                  <View key={index} style={styles.genreTag}>
                    <Text style={styles.genreText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Additional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More Info</Text>
            <View style={styles.infoGrid}>
              {movie.language && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Language</Text>
                  <Text style={styles.infoValue}>{movie.language.toUpperCase()}</Text>
                </View>
              )}
              {movie.country && movie.country !== 'N/A' && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Country</Text>
                  <Text style={styles.infoValue}>{movie.country}</Text>
                </View>
              )}
              {movie.production && movie.production !== 'N/A' && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Production</Text>
                  <Text style={styles.infoValue}>{movie.production}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
    padding: 20,
  },
  errorText: {
    color: '#e50914',
    fontSize: 16,
    textAlign: 'center',
  },
  heroSection: {
    height: 500,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  heroYear: {
    fontSize: 16,
    color: '#ffffff',
  },
  heroRuntime: {
    fontSize: 16,
    color: '#ffffff',
  },
  ratingBadge: {
    backgroundColor: '#e50914',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: 'rgba(109, 109, 110, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  contentSection: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  plot: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },
  cast: {
    fontSize: 16,
    color: '#b3b3b3',
    lineHeight: 24,
  },
  director: {
    fontSize: 16,
    color: '#b3b3b3',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    color: '#ffffff',
    fontSize: 14,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: '#8c8c8c',
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default MovieDetailScreen;
