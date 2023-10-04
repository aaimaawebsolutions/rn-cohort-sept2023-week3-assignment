import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { fallbackMoviePoster, image185 } from "../api/moviedb";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");

function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 8, marginTop: 16 }}>
      <View
        style={{
          marginLeft: 16,
          marginRight: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={{ fontSize: 16, color: "#fbbf24" }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View style={{ marginTop: 4, marginRight: 16 }}>
                <Image
                  style={{
                    borderRadius: 12,
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                />
                <Text
                  style={{
                    color: "rgb(212 212 212)",
                    marginLeft: 4,
                    marginTop: 10,
                  }}
                >
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default MovieList;
