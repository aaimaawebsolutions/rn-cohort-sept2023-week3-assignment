import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "./action/Action";

const data = [
  {
    name: "shoes 1",
    price: "INR 15,073",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f98de8bf-8c95-4354-b525-dd050b768209/dunk-low-se-shoes-MtkcPN.png",
  },
  {
    name: "shoes 2",
    price: "INR 8,050",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/aad7fc25-7871-4263-93f7-644237bdd457/air-max-systm-shoes-hLmQ85.png",
  },
  {
    name: "shoes 3",
    price: "INR 18,327",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3d17dbb4-e47e-4d73-83ef-8a8b191ff059/air-penny-2-shoes-wXPRnv.png",
  },
  {
    name: "shoes 4",
    price: "INR 8,257",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/48ef0c32-8a7b-4588-8256-81a8c731cd16/dunk-low-retro-shoes-69h36X.png",
  },
  {
    name: "shoes 5",
    price: "INR 9,777",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0996b427-9756-4ea4-a771-46a811dc2762/dunk-mid-shoes-6m6jH7.png",
  },
  {
    name: "shoes 6",
    price: "INR 10,257",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3ff6005-2dd2-4f18-a221-afb2da0b0d45/dunk-low-shoes-sggKLb.png",
  },
  {
    name: "shoes 7",
    price: "INR 9,207",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/220a9e95-2e4e-48ab-87af-6e1e914e3c04/air-force-1-07-shoes-G4VDWz.png",
  },
  {
    name: "shoes 8",
    price: "INR 7,377",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3727d0f9-a6d1-4ee9-993c-9aac2fd0b65b/air-force-1-high-07-lv8-shoes-RTQ6x1.png",
  },
];
const Products = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const addItem = (item) => {
    dispatch(addItemToCart(item));
  };

  const items = useSelector((state) => state);
  let addedItems = [];
  addedItems = items;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            height: 70,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: "800" }}>
            Shoes
          </Text>
          <TouchableOpacity
            style={{
              width: 100,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#a3e635",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginRight: 20,
            }}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <Image
              source={require("../images/bag.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "800" }}>
              {addedItems.length}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: "90%",
                  height: 100,
                  borderRadius: 15,
                  alignSelf: "center",
                  marginTop: 10,
                  borderWidth: 0.2,
                  borderColor: "#64748b",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f1f5f9",
                }}
              >
                <View style={{ width: "60%", padding: 20 }}>
                  <Text>{item.name}</Text>
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>
                    {item.price}
                  </Text>
                  <TouchableOpacity
                    style={{
                      height: 30,
                      borderRadius: 10,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#84cc16",
                      marginTop: 5,
                    }}
                    onPress={() => {
                      addItem(item);
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 100,
                    height: 90,
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Products;
