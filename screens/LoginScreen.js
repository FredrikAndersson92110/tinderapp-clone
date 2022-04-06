import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
          <Text style={styles.text}>
            {loading ? "Loading..." : "Sign in & get swiping"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.15,
    width: Dimensions.get("window").width * 0.5,
    marginHorizontal: "25%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  text: { textAlign: "center", fontWeight: "bold", color: "#F87171" },
});
