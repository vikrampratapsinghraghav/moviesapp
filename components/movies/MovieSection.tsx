import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { MovieListItem } from '../../types/Movie';
import { COLORS, DIMENSIONS } from '../../constants/theme';
import MovieItem from '../MovieItem';

interface MovieSectionProps {
  title: string;
  movies: MovieListItem[];
  onMoviePress: (movieId: number) => void;
  isScrolling: boolean;
}

const MovieSection: React.FC<MovieSectionProps> = memo(({
  title,
  movies,
  onMoviePress,
  isScrolling,
}) => {
  if (movies.length === 0) return null;

  const renderMovieItem = ({ item }: { item: MovieListItem }) => (
    <MovieItem
      movie={item}
      onPress={() => onMoviePress(item.id)}
      isScrolling={isScrolling}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
});

MovieSection.displayName = 'MovieSection';

const styles = StyleSheet.create({
  container: {
    marginBottom: DIMENSIONS.spacing.xxl,
  },
  title: {
    fontSize: DIMENSIONS.fontSize.xl,
    fontWeight: DIMENSIONS.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: DIMENSIONS.spacing.md,
    marginLeft: DIMENSIONS.spacing.lg,
  },
  list: {
    paddingHorizontal: DIMENSIONS.spacing.lg,
  },
});

export default MovieSection;
