import * as React from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";

import { GameBoard } from "./src/components/GameBoard";

export default function App() {
  const [cards, setCards] = React.useState([
    [
      { name: "One", isFlipped: false },
      { name: "Two", isFlipped: false },
      { name: "Three", isFlipped: false },
      { name: "Four", isFlipped: false },
    ],
    [
      { name: "Five", isFlipped: false },
      { name: "Six", isFlipped: false },
      { name: "Seven", isFlipped: false },
      { name: "Eight", isFlipped: false },
    ],
    [
      { name: "One", isFlipped: false },
      { name: "Two", isFlipped: false },
      { name: "Three", isFlipped: false },
      { name: "Four", isFlipped: false },
    ],
    [
      { name: "Five", isFlipped: false },
      { name: "Six", isFlipped: false },
      { name: "Seven", isFlipped: false },
      { name: "Eight", isFlipped: false },
    ],
  ]);

  const randomizeCards = () => {
    const copyOfCards = [...cards];
    for (let i = copyOfCards.length - 1; i > 0; i--) {
      for (let j = copyOfCards[i].length - 1; j > 0; j--) {
        const randomRowIndex = Math.floor(Math.random() * (i + 1));
        const randomColIndex = Math.floor(Math.random() * (j + 1));
        [copyOfCards[i][j], copyOfCards[randomRowIndex][randomColIndex]] = [
          copyOfCards[randomRowIndex][randomColIndex],
          copyOfCards[i][j],
        ];
      }
    }
    setCards(copyOfCards);
  };

  React.useEffect(() => {
    randomizeCards();
  }, []);

  const [score, setScore] = React.useState(0);

  function reset() {
    setScore(0);

    const copyOfCards = [...cards];
    for (let i = 0; i < copyOfCards.length; i++) {
      for (let j = 0; j < copyOfCards[i].length; j++) {
        copyOfCards[i][j].isFlipped = false;
      }
    }
    setCards(copyOfCards);
    randomizeCards();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Match Game</Text>
      </View>
      <View style={styles.description}>
        <Text>Flip cards to find a matching cards.</Text>
        <Text> 2 points for a match, -1 for a miss!</Text>
      </View>
      <GameBoard setScore={setScore} cards={cards} setCards={setCards} />
      <View style={styles.header}>
        <Text style={styles.h1}>Score: {score}</Text>
        <TouchableOpacity style={styles.resetButton} onPress={reset}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 75,
    width: "90%",
    margin: 10,
    borderRadius: 10,
  },
  h1: {
    fontSize: 20,
    fontWeight: "bold",
  },

  description: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  resetButton: {
    position: "absolute",
    right: 10,
    width: 70,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
