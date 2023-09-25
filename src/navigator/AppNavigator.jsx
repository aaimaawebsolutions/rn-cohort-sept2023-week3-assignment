import signInScreen from "../screens/SiginIn/index";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import { COLORS } from "../constants/theme";
import HomeScreen from "../screens/HomeScreen";
import History from "../screens/History";
import Account from "../screens/Account";
import Cart from "../screens/Cart";
import Favourites from "../screens/Favourites";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="history"
                color={color}
                size={size}
              />
            ),
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={Favourites}
          options={{
            tabBarLabel: "Favourites",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="cards-heart-outline"
                color={color}
                size={size}
              />
            ),
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
        <Tab.Screen
          name="Find Best Restuarants"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "account",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-heart-outline"
                color={color}
                size={size}
              />
            ),
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "cart",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cart" color={color} size={size} />
            ),
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          options={{ headerShown: false }}
          component={signInScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUp}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={ForgotPassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Home;
