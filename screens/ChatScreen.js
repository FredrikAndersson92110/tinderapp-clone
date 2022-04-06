import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import ChatList from "../components/ChatList";

const ChatScreen = () => {
  return (
    <View>
      <TopHeader title="Chat" />
      <ChatList />
    </View>
  );
};

export default ChatScreen;
