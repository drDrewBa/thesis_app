import React from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';

export default function Paginator({ data, scrollX }: any) {
  const { width } = useWindowDimensions();

  return (
    <View className='flex flex-row gap-4'>
      {data.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i* width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        })

        return (
          <Animated.View 
            key={i}
            style={[{ width: dotWidth, opacity }]} 
            className='paginator'
          />
        );
      })}
    </View>
  )
}