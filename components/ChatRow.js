import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

import getMatchedUserInfo from "../lib/getMatchedUserInfo";

import { db } from "../firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState({});
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
    );
  }, [matchDetails, db]);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Message", { matchDetails })}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: Dimensions.get("window").height * 0.02,
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        marginHorizontal: Dimensions.get("window").width * 0.05,
        marginVertical: Dimensions.get("window").height * 0.02,
        borderRadius: 7,
        elevation: 6,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
    >
      <Image
        style={{
          height: 60,
          width: 60,
          borderRadius: 35,
          marginRight: Dimensions.get("window").width * 0.03,
        }}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: Dimensions.get("window").height * 0.01,
          }}
        >
          {matchedUserInfo?.displayName}
        </Text>
        <Text style={{ fontSize: 16, color: "#8e8e8e" }}>
          {lastMessage ? lastMessage : "Say hi !"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
