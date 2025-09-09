import React, { useState, useEffect, useMemo } from 'react';
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

  const stars = useMemo(() => {
    const rating = Math.round((movie?.rating || 0) / 2); // TMDB 10 -> 5 stars
    return new Array(5).fill(0).map((_, i) => (i < rating ? '★' : '☆')).join(' ');
  }, [movie]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
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
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>MAX</Text></View>
            </View>
            <Text style={styles.metaText} numberOfLines={1}>Type: {movie.genre.join(' / ') || 'Movie'}</Text>
            <Text style={styles.metaSubText} numberOfLines={1}>Film Type: {movie.language?.toUpperCase() || 'EN'}</Text>
          </View>
          <Image source={{ uri: movie.poster }} style={styles.poster} />
        </View>

        <View style={styles.divider} />

        {movie.plot ? (
          <Text style={styles.description}>{movie.plot}</Text>
        ) : null}

        <View style={styles.ratingRow}>
          <Text style={styles.stars}>{stars}</Text>
          <Text style={styles.numericRating}>{(movie.rating || 0).toFixed(1)}</Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text style={styles.signatureName}>{movie.director !== 'N/A' ? movie.director : 'Director'}</Text>
          <View style={styles.signatureLine} />
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
    paddingBottom: 24,
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
    color: '#e03131',
    fontSize: 16,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexShrink: 1,
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#ffe3e3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: '#e03131',
    fontSize: 10,
    fontWeight: '700',
  },
  metaText: {
    marginTop: 6,
    color: '#868e96',
    fontSize: 13,
  },
  metaSubText: {
    marginTop: 6,
    color: '#adb5bd',
    fontSize: 12,
  },
  poster: {
    width: 110,
    height: 150,
    borderRadius: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f3f5',
    marginVertical: 20,
  },
  description: {
    color: '#343a40',
    fontSize: 14.5,
    lineHeight: 22,
  },
  ratingRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stars: {
    color: '#ffa94d',
    fontSize: 18,
    letterSpacing: 2,
  },
  numericRating: {
    color: '#ffa94d',
    fontSize: 28,
    fontWeight: '700',
  },
  signatureBlock: {
    marginTop: 24,
    alignItems: 'flex-end',
  },
  signatureName: {
    fontFamily: 'Snell Roundhand',
    fontSize: 20,
    color: '#111111',
  },
  signatureLine: {
    marginTop: 6,
    width: 140,
    height: 2,
    backgroundColor: '#dee2e6',
    borderRadius: 2,
    alignSelf: 'flex-end',
  },
});

export default MovieDetailScreen;
