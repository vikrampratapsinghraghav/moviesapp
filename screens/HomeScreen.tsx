import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MovieListItem } from '../types/Movie';
import { ApiService } from '../services/api';
import MovieItem from '../components/MovieItem';
import SearchInput from '../components/SearchInput';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

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
        <ActivityIndicator size="small" color="#ffd700" />
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
        <ActivityIndicator size="large" color="#ffd700" />
        <Text style={styles.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <SearchInput value={searchQuery} onSearch={handleSearch} isLoading={searchLoading} />
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffd700"
            colors={['#ffd700']}
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
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stickyHeader: {
    backgroundColor: '#ffffff',
  },
  listContainer: {
    paddingBottom: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;
