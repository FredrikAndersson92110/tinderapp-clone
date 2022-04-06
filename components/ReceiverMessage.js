import { View, Text, Dimensions, Image } from "react-native";
import React from "react";

const ReceiverMessage = ({ message }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: Dimensions.get("window").width * 0.05,
        marginVertical: Dimensions.get("window").height * 0.01,
      }}
    >
      <Image
        resizeMode="cover"
        style={{
          height: Dimensions.get("window").height * 0.04,
          width: "9%",
          marginRight: Dimensions.get("window").width * 0.02,

          borderRadius: 50,
        }}
        source={{ uri: message.photoURL }}
      />
      <View
        style={{
          backgroundColor: "#f87171",
          borderRadius: 7,
          paddingHorizontal: Dimensions.get("window").width * 0.05,
          paddingVertical: Dimensions.get("window").height * 0.015,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "white" }}>{message.message}</Text>
      </View>
    </View>
  );
};

export default ReceiverMessage;
