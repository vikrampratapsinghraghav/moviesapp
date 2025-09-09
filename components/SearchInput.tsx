import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface SearchInputProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value,
  onSearch, 
  placeholder = "Search movies...",
  isLoading = false
}) => {
  const handleTextChange = (text: string) => {
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8c8c8c"
          value={value}
          onChangeText={handleTextChange}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {isLoading && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="small" color="#e50914" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#141414',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#404040',
  },
  loadingIndicator: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});

export default SearchInput;
