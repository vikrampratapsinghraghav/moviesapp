import { useState, useCallback, useRef } from 'react';

interface UseSearchReturn {
  searchQuery: string;
  isSearching: boolean;
  searchLoading: boolean;
  handleSearch: (query: string) => void;
  clearSearch: () => void;
}

export const useSearch = (
  onSearch: (query: string) => void,
  onClear: () => void,
  debounceMs: number = 400
): UseSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (query.trim() === '') {
      setIsSearching(false);
      setSearchLoading(false);
      onClear();
    } else {
      setIsSearching(true);
      setSearchLoading(true);
      
      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        onSearch(query);
        setSearchLoading(false);
      }, debounceMs);
    }
  }, [onSearch, onClear, debounceMs]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchLoading(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    onClear();
  }, [onClear]);

  return {
    searchQuery,
    isSearching,
    searchLoading,
    handleSearch,
    clearSearch,
  };
};
