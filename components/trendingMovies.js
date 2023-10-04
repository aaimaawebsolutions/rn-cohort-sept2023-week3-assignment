import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { ViewPropTypes as ViewDeprecatedPropTypes } from "deprecated-react-native-prop-types";
import { withExpoSnack } from "nativewind";
import { styled } from "nativewind";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";
const StyledView = styled(View);
const StyledText = styled(Text);
const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  trendingText: {
    color: "white",
    fontSize: 20,
    marginLeft: 16,
    marginBottom: 5,
  },
});

var { width, height } = Dimensions.get("window");
export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  console.log(data);

  return (
    <StyledView className="mb-8">
      <StyledText className="text-white text-xl mx-4 mb-5">Trending</StyledText>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </StyledView>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
          borderRadius: 16,
        }}
      />
    </TouchableWithoutFeedback>
  );
};
