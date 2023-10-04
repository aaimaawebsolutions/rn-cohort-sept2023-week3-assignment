import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
export default function PersonScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovie, setPersonMovie] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovie(data.cast);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1, backgroundColor: "rgb(23 23 23)" }}
    >
      <SafeAreaView
        style={{
          zIndex: 20,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 16,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ borderRadius: 12, padding: 4, backgroundColor: "#fdba74" }}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? "#cffafe" : "#fca5a5"} />
        </TouchableOpacity>
      </SafeAreaView>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View
            style={{
              overflow: "hidden",
              borderRadius: 999,
              height: 288,
              width: 288,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid #A0AEC0",
            }}
          >
            <Image
              source={{
                uri: image342(person?.profile_path) || fallbackPersonImage,
              }}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontSize: 30,
              lineHeight: 36,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {person?.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "rgb(115 115 115)",
              textAlign: "center",
            }}
          >
            {person?.place_of_birth}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 12,
            marginRight: 12,
            marginTop: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgb(64 64 64)",
            borderRadius: 999,
            padding: 16,
          }}
        >
          <View
            style={{
              borderRightWidth: 2,
              borderRightColor: "#CBD5E0",
              paddingLeft: 8,
              paddingRight: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Gender</Text>
            <Text
              style={{
                color: "rgb(212 212 212)",
                fontSize: "14",
                lineHeight: "20",
              }}
            >
              {person?.gender == 1 ? "Female" : "Male"}
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 2,
              borderRightColor: "#CBD5E0",
              paddingLeft: 8,
              paddingRight: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Birthday</Text>
            <Text
              style={{
                color: "rgb(212 212 212)",
                fontSize: "14",
                lineHeight: "20",
              }}
            >
              {person?.birthday}
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 2,
              borderRightColor: "#CBD5E0",
              paddingLeft: 8,
              paddingRight: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Known for</Text>
            <Text
              style={{
                color: "rgb(212 212 212)",
                fontSize: "14",
                lineHeight: "20",
              }}
            >
              {person?.known_for_department}
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Popularity
            </Text>
            <Text
              style={{
                color: "rgb(212 212 212)",
                fontSize: "14",
                lineHeight: "20",
              }}
            >
              {person?.popularity?.toFixed(2)} %
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 24,
            marginLeft: 16,
            marginRight: 16,
            marginTop: 24,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, lineHeight: 28 }}>
            Biography
          </Text>
          <Text
            style={{
              color: "rgb(168 162 158)",
              letterSpacing: 0.8,
              marginTop: 8,
            }}
          >
            {person?.biography || "N/A"}
          </Text>
        </View>
        <MovieList title={"Movies"} hideSeeAll={true} data={personMovie} />
      </View>
    </ScrollView>
  );
}
