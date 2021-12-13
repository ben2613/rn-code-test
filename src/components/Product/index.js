import React from 'react';

import { ImageBackground, StyleSheet, View } from "react-native";

const Product = ({data}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: data.image }} resizeMode="cover" style={styles.image}>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    aspectRatio: 4/3,
    height: 100,
    width: null,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});

export default Product;
