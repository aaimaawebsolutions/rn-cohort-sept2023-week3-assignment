import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "./src/constants/theme";
import AppNavigator from "./src/navigator/AppNavigator";

const slides = [
  {
    id: 1,
    title: "Discover Best Places",
    description:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require("./src/assets/onScreen1.webp"),
  },
  {
    id: 2,
    title: "Choose A Tasty Dish",
    description:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require("./src/assets/welcomeImage.jpg"),
  },
  {
    id: 3,
    title: "Pick Up The Delivery",
    description:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"',
    image: require("./src/assets/onScreen3.jpeg"),
  },
];

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);

  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: COLORS.title,
            fontWeight: "600",
            fontSize: SIZES.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 15,
                paddingTop: 120,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: SIZES.width,
                  height: 300,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.title,
                  fontSize: SIZES.h1,
                  paddingTop: 30,
                }}
              >
                {item.title}
              </Text>
              <Text>{item.description}</Text>
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: COLORS.primary,
          width: 30,
        }}
        showSkipButton
        renderNextButton={() => buttonLabel("Next")}
        renderSkipButton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Done")}
        onDone={() => {
          setShowHomePage(true);
        }}
      />
    );
  }

  return <AppNavigator />;
}
