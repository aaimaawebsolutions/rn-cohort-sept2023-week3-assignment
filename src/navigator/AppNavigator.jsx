import signInScreen from "../screens/SiginIn";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import { COLORS } from "../constants/theme";

const Stack = createNativeStackNavigator();

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

export default AppNavigator;
