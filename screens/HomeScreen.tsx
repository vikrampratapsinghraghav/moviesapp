import React, { useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useMovies } from "../hooks/useMovies";
import { useSearch } from "../hooks/useSearch";
import { useScrollState } from "../hooks/useScrollState";
import SearchInput from "../components/SearchInput";
import HeroBanner from "../components/movies/HeroBanner";
import MovieSection from "../components/movies/MovieSection";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import MovieItem from "../components/MovieItem";
import { COLORS } from "../constants/theme";
import { homeScreenStyles } from "../styles";

const { width } = Dimensions.get("window");

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const {
    movies,
    loading,
    refreshing,
    loadingMore,
    error,
    fetchMovies,
    searchMovies,
    onRefresh,
    loadMore,
  } = useMovies();

  const { isScrolling, onScrollBeginDrag, onScrollEndDrag, onMomentumScrollEnd } = useScrollState();

  const handleSearch = useCallback((query: string) => {
    searchMovies(query, 1);
  }, [searchMovies]);

  const handleClearSearch = useCallback(() => {
    fetchMovies(1, true);
  }, [fetchMovies]);

  const handleMoviePress = useCallback((movieId: number) => {
    navigation.navigate("MovieDetail", { movieId });
  }, [navigation]);

  const renderMovieItem = useCallback(({ item }: { item: any }) => (
    <MovieItem
      movie={item}
      onPress={() => handleMoviePress(item.id)}
      isScrolling={isScrolling}
    />
  ), [handleMoviePress, isScrolling]);

  const renderHeroBanner = useCallback(() => {
    if (movies.length > 0) {
      return <HeroBanner movie={movies[0]} onPress={() => handleMoviePress(movies[0].id)} />;
    }
    return null;
  }, [movies, handleMoviePress]);

  const renderHorizontalSection = useCallback((title: string, data: any[]) => {
    if (data.length === 0) return null;
    
    return (
      <MovieSection
        key={title}
        title={title}
        movies={data}
        onMoviePress={handleMoviePress}
        isScrolling={isScrolling}
      />
    );
  }, [handleMoviePress, isScrolling]);

  const renderFooter = useCallback(() => (
    <View style={{ padding: 20, alignItems: "center" }}>
      <LoadingSpinner size="small" />
    </View>
  ), []);

  const renderError = useCallback(() => (
    <View style={homeScreenStyles.errorContainer}>
      <EmptyState
        title="Something went wrong"
        subtitle="Failed to load movies. Please try again."
      />
    </View>
  ), []);

  useEffect(() => {
    fetchMovies(1, true);
  }, [fetchMovies]);

  if (loading && movies.length === 0) {
    return (
      <View style={homeScreenStyles.container}>
        <View style={homeScreenStyles.searchContainer}>
          <SearchInput
            value=""
            onSearch={handleSearch}
            isLoading={false}
          />
        </View>
        <View style={homeScreenStyles.loadingContainer}>
          <LoadingSpinner />
        </View>
      </View>
    );
  }

  if (error && movies.length === 0) {
    return (
      <View style={homeScreenStyles.container}>
        <View style={homeScreenStyles.searchContainer}>
          <SearchInput
            value=""
            onSearch={handleSearch}
            isLoading={false}
          />
        </View>
        {renderError()}
      </View>
    );
  }

  return (
    <View style={homeScreenStyles.container}>
      <View style={homeScreenStyles.searchContainer}>
        <SearchInput
          value=""
          onSearch={handleSearch}
          isLoading={false}
        />
      </View>
      
      {movies.length === 0 ? (
        <View style={homeScreenStyles.loadingContainer}>
          <EmptyState
            title="No movies found"
            subtitle="Try searching for something else"
          />
        </View>
      ) : (
        <ScrollView
          style={homeScreenStyles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
          onScrollBeginDrag={onScrollBeginDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          showsVerticalScrollIndicator={false}
        >
          {renderHeroBanner()}
          {renderHorizontalSection("Trending Now", movies.slice(1, 11))}
          {renderHorizontalSection("Popular Movies", movies.slice(11, 21))}
          {renderHorizontalSection("Top Rated", movies.slice(21, 31))}
          {loadingMore && renderFooter()}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
