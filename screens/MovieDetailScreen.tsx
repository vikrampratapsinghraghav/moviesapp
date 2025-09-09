import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Movie } from "../types/Movie";
import { ApiService } from "../services/api";
import { movieDetailStyles } from "../styles";

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

const { width: screenWidth } = Dimensions.get("window");

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
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch movie details";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={movieDetailStyles.container}>
        <View style={movieDetailStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#e50914" />
        </View>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={movieDetailStyles.container}>
        <View style={movieDetailStyles.errorContainer}>
          <Text style={movieDetailStyles.errorText}>
            {error || "Movie not found"}
          </Text>
          <TouchableOpacity
            style={movieDetailStyles.retryButton}
            onPress={fetchMovieDetails}
          >
            <Text style={movieDetailStyles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={movieDetailStyles.container}>
      <ScrollView style={movieDetailStyles.scrollView}>
        {/* Hero Section */}
        <View style={movieDetailStyles.heroSection}>
          <Image
            source={{ uri: movie.backdrop }}
            style={movieDetailStyles.heroImage}
            resizeMode="cover"
          />
          <View style={movieDetailStyles.heroOverlay}>
            <View style={movieDetailStyles.heroContent}>
              <Text style={movieDetailStyles.heroTitle}>{movie.title}</Text>
              <View style={movieDetailStyles.heroMeta}>
                <Text style={movieDetailStyles.heroYear}>{movie.year}</Text>
                <Text style={movieDetailStyles.heroRuntime}>{movie.runtime} min</Text>
                <View style={movieDetailStyles.ratingBadge}>
                  <Text style={movieDetailStyles.ratingText}>
                    ⭐ {movie.rating.toFixed(1)}
                  </Text>
                </View>
              </View>
              <View style={movieDetailStyles.heroButtons}>
                <TouchableOpacity style={movieDetailStyles.playButton}>
                  <Text style={movieDetailStyles.playButtonText}>▶ Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={movieDetailStyles.downloadButton}>
                  <Text style={movieDetailStyles.downloadButtonText}>⬇ Download</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={movieDetailStyles.contentSection}>
          {/* Plot */}
          <View style={movieDetailStyles.section}>
            <Text style={movieDetailStyles.sectionTitle}>Plot</Text>
            <Text style={movieDetailStyles.plot}>{movie.plot}</Text>
          </View>

          {/* Cast & Director */}
          <View style={movieDetailStyles.section}>
            <Text style={movieDetailStyles.sectionTitle}>Cast & Crew</Text>
            <Text style={movieDetailStyles.director}>
              Director: {movie.director}
            </Text>
            {movie.cast && (
              <Text style={movieDetailStyles.cast}>
                Cast: {movie.cast}
              </Text>
            )}
          </View>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <View style={movieDetailStyles.section}>
              <Text style={movieDetailStyles.sectionTitle}>Genres</Text>
              <View style={movieDetailStyles.genreContainer}>
                {movie.genres.map((genre, index) => (
                  <View key={index} style={movieDetailStyles.genreTag}>
                    <Text style={movieDetailStyles.genreText}>{genre}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Additional Info */}
          <View style={movieDetailStyles.section}>
            <Text style={movieDetailStyles.sectionTitle}>Details</Text>
            <View style={movieDetailStyles.infoGrid}>
              <View style={movieDetailStyles.infoItem}>
                <Text style={movieDetailStyles.infoLabel}>Release Date:</Text>
                <Text style={movieDetailStyles.infoValue}>{movie.releaseDate}</Text>
              </View>
              <View style={movieDetailStyles.infoItem}>
                <Text style={movieDetailStyles.infoLabel}>Runtime:</Text>
                <Text style={movieDetailStyles.infoValue}>{movie.runtime} min</Text>
              </View>
              <View style={movieDetailStyles.infoItem}>
                <Text style={movieDetailStyles.infoLabel}>Rating:</Text>
                <Text style={movieDetailStyles.infoValue}>{movie.rating.toFixed(1)}/10</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetailScreen;
