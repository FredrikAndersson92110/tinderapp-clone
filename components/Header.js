import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const Header = ({ logout }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={logout}>
        <Image style={styles.profileImage} source={{ uri: user.photoURL }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
        <Image
          style={{ height: 55, width: 55 }}
          source={require("../assets/logo.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
  },
  profileImage: { height: 45, width: 45, borderRadius: 50 },
});
