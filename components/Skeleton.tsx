import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}) => {
  const shimmerX = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmerX, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerX]);

  const translate = shimmerX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-150, 150],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: translate }],
          },
        ]}
      />
    </View>
  );
};

export const SkeletonPoster: React.FC<{ width?: number; height?: number; style?: any }> = ({
  width = 80,
  height = 120,
  style,
}) => (
  <Skeleton width={width} height={height} borderRadius={12} style={style} />
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#e9ecef',
  },
  shimmer: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: 150,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});

export default Skeleton;
