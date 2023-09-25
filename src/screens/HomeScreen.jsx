import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
// import { Icon } from "react-native-vector-icons/Icon";
import { COLORS, SIZES } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import Restuarants from "../components/Restaurants";
import DATA from "../data/data.json";

const HomeScreen = ({ navigation }) => {
  // filter by price type
  const filterData = (price) =>
    DATA.restaurants.filter((result) => result.price === price);
  return (
    <View>
      <View style={styles.top}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={25} color={COLORS.grey} />
          <TextInput
            placeholder="what you like to eat?"
            style={styles.search}
          />
        </View>
      </View>
      <ScrollView>
        <Restuarants title={"Cost Effective"} data={filterData("$")} />
        <Restuarants title={"Bit Pricer"} data={filterData("$")} />
        <Restuarants title={"Big Spender"} data={filterData("$")} />
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  top: {
    backgroundColor: COLORS.primary,
    padding: 10,
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    width: SIZES.width - 20,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
  },
  search: {
    marginLeft: 10,
    color: COLORS.title,
  },
});
