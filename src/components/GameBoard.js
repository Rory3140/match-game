import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import { Card } from "./Card";

export const GameBoard = ({ setScore, cards, setCards }) => {
  const [firstCard, setFirstCard] = React.useState({ row: -1, col: -1 });

  function handleFlip(row, col) {
    const copyOfCards = [...cards];
    const selectedCard = copyOfCards[row][col];

    if (!selectedCard.isFlipped) {
      selectedCard.isFlipped = true;

      if (firstCard.row === -1 && firstCard.col === -1) {
        setFirstCard({ row, col });
      } else {
        const firstSelectedCard = copyOfCards[firstCard.row][firstCard.col];

        if (selectedCard.name === firstSelectedCard.name) {
          setScore((prevScore) => prevScore + 2);
          setCards(copyOfCards);
        } else {
          setScore((prevScore) => prevScore - 1);

          setTimeout(() => {
            selectedCard.isFlipped = false;
            firstSelectedCard.isFlipped = false;
            setCards(copyOfCards);
          }, 500);
        }

        setFirstCard({ row: -1, col: -1 });
      }
    }
  }

  return (
    <View style={styles.container}>
      {cards.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((card, colIndex) => (
            <Card
              key={`${rowIndex}-${colIndex}`}
              onPress={() => handleFlip(rowIndex, colIndex)}
              value={card.name}
              isFlipped={card.isFlipped}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});
