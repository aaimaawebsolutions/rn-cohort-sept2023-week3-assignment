import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { fallbackPersonImage, image185 } from "../api/moviedb";

export default function Cast({ cast, navigation }) {
  let personName = "Keanu Reevs";
  let characterName = "Jhon Wick";
  return (
    <View style={{ marginTop: 24, marginBottom: 24 }}>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 16,
        }}
      >
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ marginRight: 16, alignItems: "center" }}
                onPress={() => navigation.navigate("Person", person)}
              >
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: "50%",
                    height: 80,
                    width: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #A0AEC0",
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 16,
                      height: 96,
                      width: 80,
                    }}
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                  />
                </View>

                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text
                  style={{
                    color: "rgb(212 212 212)",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
