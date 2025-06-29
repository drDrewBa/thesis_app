import React, { useRef, useState } from "react";
import { Animated, FlatList, View } from "react-native";
import CarouselItem from "./CarouselItem";
import Paginator from "./Paginator";

function Carousel({ data }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <View className="flex-1 items-center justify-center pb-10">
      <View className="flex-3">
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => <CarouselItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          ref={slidesRef}
        />
      </View>
      <Paginator data={data} scrollX={scrollX}/>
    </View>
  );
}

export default Carousel;
