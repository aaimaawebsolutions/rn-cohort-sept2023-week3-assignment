import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import styles from "./styles";
import { COLORS } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import { Home } from "../../navigator/AppNavigator";

const signInScreen = ({ navigation, setIsShowHome }) => {
  <StatusBar style="light" />;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={{
          flex: 1,
        }}
        resizeMode="cover"
      >
        <ScrollView>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign In to Continue</Text>
          </View>
          <View style={styles.dataContainer}>
            <TextInput
              placeholder="Username"
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.button1}>
                <Text style={styles.btnText}>SIGN IN</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.text}>Forgot your password? </Text>
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.text}>Don't have an account? | Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default signInScreen;
