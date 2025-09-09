import React, { memo } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../constants/theme";
import { searchInputStyles } from "../styles";

interface SearchInputProps {
  value: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = memo(({
  value,
  onSearch,
  isLoading = false,
  placeholder = "Search movies...",
}) => {
  return (
    <View style={searchInputStyles.container}>
      <TextInput
        style={searchInputStyles.input}
        value={value}
        onChangeText={onSearch}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textTertiary}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={COLORS.primary}
          style={searchInputStyles.loadingContainer}
        />
      )}
    </View>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
