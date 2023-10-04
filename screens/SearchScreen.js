import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { debounce } from "lodash";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const movieName = "1917";
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);
  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data.results && data) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(38 38 38)" }}>
      <View
        style={{
          marginTop: 12,
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 12,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: "rgb(115 115 115)",
          borderWidth: 1,
          borderRadius: 999,
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={{
            paddingBottom: 4,
            paddingLeft: 24,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 24,
            color: "white",
            letterSpacing: 0.8,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            borderRadius: 999,
            padding: 16,
            margin: 4,
            backgroundColor: "#fff1f2",
          }}
        >
          <XMarkIcon size="25" color="#fda4af" />
        </TouchableOpacity>
      </View>
      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ marginTop: 12 }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              lineHeight: 24,
              marginLeft: 4,
            }}
          >
            Results ({results.length})
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {results.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View style={{ marginTop: 16 }}>
                    <Image
                      style={{
                        marginBottom: 12,
                        borderRadius: 24,
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                    />

                    <Text style={{ marginLeft: 4, color: "rgb(212 212 212)" }}>
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/images/movieTime.png")}
            style={{ height: 384, width: 384 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
