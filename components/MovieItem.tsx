import React, { useRef, useEffect, memo } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing,
} from "react-native";
import { MovieListItem } from "../types/Movie";
import { movieItemStyles } from "../styles";

interface MovieItemProps {
  movie: MovieListItem;
  onPress: () => void;
  isScrolling?: boolean;
}

const MovieItem: React.FC<MovieItemProps> = memo(({ movie, onPress, isScrolling = false }) => {
  const scale = useRef(new Animated.Value(0.95)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start(() => {
      if (!isScrolling) {
        onPress();
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[movieItemStyles.container, { transform: [{ scale }], opacity }]}>
        <Image 
          source={{ uri: movie.poster }} 
          style={movieItemStyles.poster}
          resizeMode="cover"
        />
        <View style={movieItemStyles.content}>
          <Text style={movieItemStyles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={movieItemStyles.year}>{movie.year}</Text>
          <Text style={movieItemStyles.director}>{movie.director}</Text>
          {movie.rating > 0 && (
            <View style={movieItemStyles.rating}>
              <Text style={movieItemStyles.ratingText}>⭐ {movie.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

MovieItem.displayName = "MovieItem";

export default MovieItem;
