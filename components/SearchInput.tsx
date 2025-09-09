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
          placeholderTextColor="#888"
          value={value}
          onChangeText={handleTextChange}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {isLoading && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="small" color="#ffd700" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#f1f3f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111111',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingRight: 50, // Make room for loading indicator
  },
  loadingIndicator: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});

export default SearchInput;
