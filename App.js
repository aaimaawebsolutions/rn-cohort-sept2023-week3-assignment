import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { mystore } from "./components/store/Store";
import { createStackNavigator } from "@react-navigation/stack";
import Products from "./components/Product";
import Cart from "./components/Carts";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={mystore}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
