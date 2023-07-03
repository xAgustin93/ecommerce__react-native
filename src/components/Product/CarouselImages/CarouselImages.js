import { useState } from "react";
import { Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import { styles } from "./CarouselImages.styles";

const { width } = Dimensions.get("window");

export function CarouselImages(props) {
  const { images } = props;
  const [imageActive, setImageActive] = useState(0);

  const renderItem = ({ item }) => {
    return <Image source={{ uri: item }} style={styles.image} />;
  };

  return (
    <>
      <Carousel
        layout="default"
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setImageActive(index)}
      />
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={imageActive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
      />
    </>
  );
}
