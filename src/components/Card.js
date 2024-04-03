import * as React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export const Card = ({ onPress, value, isFlipped }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {!isFlipped && (
        <Image
          source={require("../blackCardBack.jpg")}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {isFlipped && <Text>{value}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#7ca1b4",
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
