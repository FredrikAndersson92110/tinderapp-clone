import { View, Text, Dimensions } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "#9333ea",
        borderRadius: 7,
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        paddingVertical: Dimensions.get("window").height * 0.015,
        marginHorizontal: Dimensions.get("window").width * 0.05,
        marginVertical: Dimensions.get("window").height * 0.01,
        alignSelf: "flex-start",
        marginLeft: "auto",
      }}
    >
      <Text style={{ color: "white" }}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
