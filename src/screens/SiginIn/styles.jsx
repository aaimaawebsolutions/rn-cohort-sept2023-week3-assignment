import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    marginTop: 150,
    alignItems: "center",
  },
  title: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.h1 * 1.5,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: SIZES.h1,
    paddingTop: 4,
  },
  dataContainer: {
    marginTop: 50,
  },
  textinput: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  btnContainer: {
    marginTop: 50,
  },
  button1: {
    backgroundColor: COLORS.primary,
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.h4,
  },
  text: {
    color: COLORS.white,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
    fontSize: SIZES.h4,
  },
  bottomContainer: {
    justifyContent: "center",
    marginTop: 15,
  },
});

export default styles;
