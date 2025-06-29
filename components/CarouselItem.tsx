import React from "react";
import { Image, Text, useWindowDimensions, View } from 'react-native';

function CarouselItem({ item } : any) {
  const {width} = useWindowDimensions();

  return (
    <View 
      className='flex items-center'
      style={[{ width }]}
    >
      <Image
        source={item.image}
        className="carousel-img"
      />
      <View className="flex items-center gap-6">
        <Text className="carousel-title">
          {item.title}
        </Text>
        <Text className="carousel-desc">
          {item.description}
        </Text>
      </View>
    </View>
  );
}

export default CarouselItem;
