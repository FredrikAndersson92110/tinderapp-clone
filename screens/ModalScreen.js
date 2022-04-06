import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

import { doc, setDoc, serverTimestamp } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: user.uid,
    displayName: user.displayName,
    photoURL: "",
    job: "",
    age: "",
  });

  console.log(formData);
  const incompleteForm = !formData.photoURL || !formData.job || !formData.age;

  const updateUserProfile = () => {
    setLoading(true);
    setDoc(doc(db, "users", user.uid), {
      ...formData,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.modalContainer}>
      <Image
        style={{ height: 70, width: "100%" }}
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text style={styles.headerText}>Welcome {user.displayName}</Text>

      <Text style={styles.label}>image Step 1: The profile pic</Text>
      <TextInput
        value={formData.photoURL}
        onChangeText={(text) => setFormData({ ...formData, photoURL: text })}
        style={styles.input}
        placeholder="Enter a Profile Pic URL"
      />

      <Text style={styles.label}>Step 2: The Job</Text>
      <TextInput
        value={formData.job}
        onChangeText={(text) => setFormData({ ...formData, job: text })}
        style={styles.input}
        placeholder="Enter your occupation"
      />

      <Text style={styles.label}>Step 3: The Age</Text>
      <TextInput
        value={formData.age}
        onChangeText={(text) => setFormData({ ...formData, age: text })}
        style={styles.input}
        placeholder="Enter your age"
        maxLength={2}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={updateUserProfile}
        disabled={incompleteForm}
        style={[
          styles.button,
          incompleteForm
            ? { backgroundColor: "#9CA3AF" }
            : { backgroundColor: "#F87171" },
        ]}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Update Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.05,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: Dimensions.get("window").height * 0.01,
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#f87171",
    padding: 15,
  },
  input: { textAlign: "center", fontSize: 16, padding: 8 },
  button: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.05,
    backgroundColor: "#F87171",
    padding: 18,
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.7,
  },
  buttonText: { textAlign: "center", color: "white", fontSize: 20 },
});
