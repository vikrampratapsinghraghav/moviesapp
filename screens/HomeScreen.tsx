import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MovieListItem } from '../types/Movie';
import { ApiService } from '../services/api';
import MovieItem from '../components/MovieItem';
import SearchInput from '../components/SearchInput';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const scrollReleaseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchMovies = useCallback(async (pageNum: number = 1, isRefresh: boolean = false) => {
    try {
      setError(null);
      const data = await ApiService.fetchMovies(pageNum);
      if (isRefresh || pageNum === 1) {
        setMovies(data);
      } else {
        setMovies(prev => [...prev, ...data]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movies';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, []);

  const searchMovies = useCallback(async (query: string, pageNum: number = 1) => {
    try {
      setError(null);
      setSearchLoading(true);
      const data = await ApiService.searchMovies(query, pageNum);
      if (pageNum === 1) {
        setMovies(data);
      } else {
        setMovies(prev => [...prev, ...data]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      Alert.alert('Search Error', errorMessage);
    } finally {
      setSearchLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (query.trim() === '') {
      setIsSearching(false);
      setPage(1);
      setLoading(true);
      fetchMovies(1, true);
    } else {
      setIsSearching(true);
      setPage(1);
      searchTimeoutRef.current = setTimeout(() => {
        searchMovies(query, 1);
      }, 400);
    }
  }, [fetchMovies, searchMovies]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    if (searchQuery.trim() === '') {
      fetchMovies(1, true);
    } else {
      searchMovies(searchQuery, 1);
    }
  }, [fetchMovies, searchMovies, searchQuery]);

  const loadMore = useCallback(() => {
    if (loadingMore || loading || searchLoading) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    if (searchQuery.trim() === '') {
      fetchMovies(nextPage);
    } else {
      searchMovies(searchQuery, nextPage);
    }
  }, [page, loadingMore, loading, searchLoading, searchQuery, fetchMovies, searchMovies]);

  const handleMoviePress = useCallback((movieId: number) => {
    navigation.navigate('MovieDetail', { movieId });
  }, [navigation]);

  const renderMovieItem = useCallback(({ item }: { item: MovieListItem }) => (
    <MovieItem movie={item} onPress={() => handleMoviePress(item.id)} isScrolling={isScrolling} />
  ), [handleMoviePress, isScrolling]);

  const renderHeroMovie = () => {
    if (movies.length === 0) return null;
    const heroMovie = movies[0];
    return (
      <TouchableOpacity 
        style={styles.heroContainer}
        onPress={() => handleMoviePress(heroMovie.id)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: heroMovie.poster }} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{heroMovie.title}</Text>
          <Text style={styles.heroDescription} numberOfLines={3}>
            {heroMovie.plot}
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>▶ Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ℹ More Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHorizontalSection = (title: string, data: MovieListItem[]) => {
    if (data.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {isSearching ? 'No movies found for your search' : 'No movies available'}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#e50914" />
      </View>
    );
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (scrollReleaseTimeout.current) clearTimeout(scrollReleaseTimeout.current);
    };
  }, []);

  if (loading && !refreshing && movies.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  if (isSearching) {
    return (
      <View style={styles.container}>
        <SearchInput value={searchQuery} onSearch={handleSearch} isLoading={searchLoading} />
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#e50914"
              colors={['#e50914']}
            />
          }
          onScrollBeginDrag={() => {
            if (scrollReleaseTimeout.current) clearTimeout(scrollReleaseTimeout.current);
            setIsScrolling(true);
          }}
          onMomentumScrollEnd={() => {
            scrollReleaseTimeout.current = setTimeout(() => setIsScrolling(false), 120);
          }}
          onScrollEndDrag={() => {
            scrollReleaseTimeout.current = setTimeout(() => setIsScrolling(false), 120);
          }}
          contentContainerStyle={styles.searchListContainer}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  }

  // Create sections data
  const trendingMovies = movies.slice(0, 10);
  const popularMovies = movies.slice(10, 20);
  const topRatedMovies = movies.slice(20, 30);

  return (
    <View style={styles.container}>
      <SearchInput value={searchQuery} onSearch={handleSearch} isLoading={searchLoading} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#e50914"
            colors={['#e50914']}
          />
        }
        onScrollBeginDrag={() => {
          if (scrollReleaseTimeout.current) clearTimeout(scrollReleaseTimeout.current);
          setIsScrolling(true);
        }}
        onMomentumScrollEnd={() => {
          scrollReleaseTimeout.current = setTimeout(() => setIsScrolling(false), 120);
        }}
        onScrollEndDrag={() => {
          scrollReleaseTimeout.current = setTimeout(() => setIsScrolling(false), 120);
        }}
      >
        {renderHeroMovie()}
        {renderHorizontalSection('Trending Now', trendingMovies)}
        {renderHorizontalSection('Popular Movies', popularMovies)}
        {renderHorizontalSection('Top Rated', topRatedMovies)}
        
        {loadingMore && (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color="#e50914" />
          </View>
        )}
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
  listContainer: {
    paddingBottom: 20,
  },
  searchListContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#8c8c8c',
    fontSize: 16,
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  heroContainer: {
    height: 400,
    marginBottom: 20,
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
    lineHeight: 22,
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
  },
  playButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  infoButton: {
    backgroundColor: 'rgba(109, 109, 110, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  infoButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
    marginLeft: 16,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
