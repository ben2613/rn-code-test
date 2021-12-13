import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View, Text } from "react-native";

// Get window box for Flat list height
const { height, width } = Dimensions.get('window');

const calculatePrice = (data) => {
  let ret = 0;
  if (data.discount_type === 'percentage') {
    ret = Math.round(data.price * (100 - data.discount) / 100);
  } else if (data.discount_type === 'amount') {
    ret = data.price - data.discount;
  } else {
    ret = data.price;
  }
  return formatPrice(ret)
};
const formatPrice = (numPrice) => {
  if (numPrice === 0) {
    return 'Free'
  }
  const s = numPrice.toString();
  return '\u00A3' + s.substring(0,s.length-2) + '.' + s.substring(s.length-2)
};
const Product = ({ data }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: data.image }} resizeMode="cover" style={styles.imageView}>
        <View style={styles.info}>
          <Text style={styles.titlePrice}>{data.name}</Text>
          <Text style={styles.titlePrice}>
            {calculatePrice(data)}
          </Text>
          <Text style={styles.short_desc}>{data.short_description}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0.3 * height,
  },
  imageView: {
    // flex: 1,
    justifyContent: "flex-end",
    aspectRatio: 4 / 3,
    height: '100%',
    width: null,
    borderRadius: 15,
    overflow: 'hidden',
  },
  info: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 6,
  },
  titlePrice: {
    color: 'white',
    fontWeight: 'bold',
  },
  short_desc: {
    color: 'white',
  }
});

export default Product;
