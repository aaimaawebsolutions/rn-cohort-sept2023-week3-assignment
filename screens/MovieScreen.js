import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import MovieList from "../components/movieList";
import Cast from "../components/Cast";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  let movieName = "1917";

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ flex: 1, backgroundColor: "rgb(23 23 23)" }}
    >
      <View style={{ width: "100%" }}>
        <SafeAreaView
          style={{
            position: "absolute",
            zIndex: 20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
            <HeartIcon
              size="35"
              color={isFavourite ? "rgb(23 23 23)" : "#fca5a5"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{
                width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: -(height * 0.09), marginTop: 12 }}>
        <Text
          style={{
            color: "rgb(255 255 255)",
            textAlign: "center",
            fontSize: 30,
            lineHeight: 36,
            fontWeight: 700,
            letterSpacing: 0.8,
          }}
        >
          {movie?.title}
        </Text>
        {movie?.id ? (
          <Text
            style={{
              color: "rgb(163 163 163)",
              fontWeight: 600,
              fontSize: 16,
              lineHeight: 24,
              textAlign: "center",
              marginTop: 16,
            }}
          >
            {movie?.status} · {movie?.release_date?.split("-")[0]} ·
            {movie?.runtime} min
          </Text>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginRight: 16,
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 8,
          }}
        >
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
            return (
              <Text
                style={{
                  color: "rgb(163 163 163)",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: 24,
                  textAlign: "center",
                }}
              >
                {genre?.name}
                {showDot ? " · " : null}
              </Text>
            );
          })}
        </View>
        <Text
          style={{
            color: "rgb(163 163 163)",
            marginLeft: 10,
            marginRight: 10,
            letterSpacing: 0.4,
          }}
        >
          {movie?.overview}
        </Text>
      </View>
      <Cast navigation={navigation} cast={cast} />
      <MovieList
        hideSeeAll={true}
        title="Similar Movies"
        data={similarMovies}
      />
    </ScrollView>
  );
}
