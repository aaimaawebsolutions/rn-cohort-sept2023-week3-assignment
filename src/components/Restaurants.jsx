import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";

const restuarants = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.textBtn}>{`View all >>`}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <View>
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.name}>{item.name}</Text>
              <Text
                style={styles.address}
              >{`${item.location.address1}, ${item.location.city}`}</Text>
              <View style={styles.rating}>
                {/* <Rating count={item.rating} /> */}
                <Text style={styles.address}>
                  ({item.review_count} reviews)
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default restuarants;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.title,
    fontSize: SIZES.h3,
    fontWeight: "bold",
    marginVertical: 10,
  },
  textBtn: {
    color: COLORS.primary,
    fontSize: SIZES.h6,
    fontWeight: "700",
  },
  item: {
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  image: {
    width: SIZES.width / 2 + 60,
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    color: COLORS.title,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: SIZES.h4,
  },
  address: {
    color: COLORS.grey,
    fontWeight: "800",
    fontSize: SIZES.h6,
    marginHorizontal: 10,
  },
});
