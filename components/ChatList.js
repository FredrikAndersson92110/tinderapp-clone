import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import ChatRow from "./ChatRow";

import { db } from "../firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import useAuth from "../hooks/useAuth";

const ChatList = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) => {
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      ),
    []
  );

  return matches.length > 0 ? (
    <FlatList
      style={{ height: "100%" }}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          marginTop: Dimensions.get("window").height * 0.1,
        }}
      >
        No Matches at the moment 😥
      </Text>
    </View>
  );
};

export default ChatList;
