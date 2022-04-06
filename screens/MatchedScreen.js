import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
          source={{
            uri: "https://links.papareact.com/mg9",
          }}
        />
      </View>
      <Text style={styles.matchText}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View style={styles.photoContainer}>
        <Image
          style={styles.image}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image style={styles.image} source={{ uri: userSwiped.photoURL }} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
          Send a message
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    paddingVertical: Dimensions.get("window").height * 0.05,
    height: "100%",
    backgroundColor: "#ef4444",
    paddingTop: Dimensions.get("window").height * 0.1,
    opacity: 0.89,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.1,
  },
  matchText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  photoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height * 0.05,
  },
  image: { height: 100, width: 100, borderRadius: 50 },
  button: {
    backgroundColor: "white",
    margin: Dimensions.get("window").height * 0.05,
    padding: Dimensions.get("window").width * 0.08,
    borderRadius: 35,
    marginTop: Dimensions.get("window").height * 0.2,
  },
});
