import { useState, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { MovieListItem } from '../types/Movie';
import { ApiService } from '../services/api';

interface UseMoviesReturn {
  movies: MovieListItem[];
  loading: boolean;
  refreshing: boolean;
  loadingMore: boolean;
  error: string | null;
  page: number;
  fetchMovies: (pageNum?: number, isRefresh?: boolean) => Promise<void>;
  searchMovies: (query: string, pageNum?: number) => Promise<void>;
  onRefresh: () => void;
  loadMore: () => void;
  clearError: () => void;
}

export const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

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
      setLoadingMore(true);
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
      setLoadingMore(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchMovies(1, true);
  }, [fetchMovies]);

  const loadMore = useCallback(() => {
    if (loadingMore || loading) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  }, [page, loadingMore, loading, fetchMovies]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    movies,
    loading,
    refreshing,
    loadingMore,
    error,
    page,
    fetchMovies,
    searchMovies,
    onRefresh,
    loadMore,
    clearError,
  };
};
