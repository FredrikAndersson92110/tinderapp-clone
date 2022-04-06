import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

import Header from "../components/Header";
import {
  onSnapshot,
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);
  console.log(user);
  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(() =>
    onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    })
  ),
    [];

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, []);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log("You swiped Pass on " + userSwiped.displayName);
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    // Check if user swiped on you...
    await getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // you matchedd with someone that already swiped on you

          console.log("yay, you matched with " + userSwiped.displayName);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          //Create Match !
          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          //Redirect to match screen and pass props
          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log("You swiped Match on " + userSwiped.displayName);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <View
      style={{ flex: 1, marginTop: Dimensions.get("window").height * 0.07 }}
    >
      <Header logout={logout} />

      {/* Swiper */}
      <View style={{ flex: 1 }}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          onSwipedLeft={(cardIndex) => {
            console.log("swiped NOPE");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("swiped MATCH");
            swipeRight(cardIndex);
          }}
          renderCard={(card) =>
            card ? (
              <View key={card.id} style={styles.card}>
                <Image
                  style={styles.cardImage}
                  source={{ uri: card.photoURL }}
                />
                <View style={styles.cardInfo}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    {card.age}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  { justifyContent: "center", alignItems: "center" },
                  styles.card,
                ]}
              >
                <Text style={{ fontWeight: "bold", paddingBottom: 10 }}>
                  No more profiles
                </Text>
                <Image
                  style={{ height: 80, width: 80 }}
                  height={100}
                  width={100}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />
      </View>
      {/* end of swiper */}

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={styles.passButton}
        >
          <Entypo name="cross" size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={styles.matchButton}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
      {/* end of footer */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: 15,
    height: Dimensions.get("window").height * 0.6,
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardImage: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  cardInfo: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: Dimensions.get("window").height * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Dimensions.get("window").height * 0.02,
  },
  passButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    width: 70,
    height: 70,
    backgroundColor: "#ffa5ab",
  },
  matchButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    width: 70,
    height: 70,
    backgroundColor: "#B9EFA6",
  },
});
