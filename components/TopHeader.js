import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React from "react";

import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const TopHeader = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const call = () => {
    Linking.openURL(`tel:${user.phoneNumber}`);
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#FF6864" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity
          style={styles.callButton}
          onPress={() =>
            user.phoneNumber
              ? call
              : alert(`${user.displayName} has note registrer a phone number`)
          }
        >
          <Foundation name="telephone" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.07,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: Dimensions.get("window").width * 0.02,
  },
  headerButton: { paddingLeft: Dimensions.get("window").width * 0.02 },
  callButton: {
    backgroundColor: "#FECACA",
    borderRadius: 20,
    marginRight: Dimensions.get("window").width * 0.1,
    padding: Dimensions.get("window").width * 0.03,
    paddingHorizontal: Dimensions.get("window").width * 0.035,
  },
});
