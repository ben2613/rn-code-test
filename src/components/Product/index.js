import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, View, Text } from "react-native";

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
  return formatPrice(ret);
};
const formatPrice = (numPrice) => {
  if (numPrice === 0) {
    return 'Free';
  }
  const s = numPrice.toString();
  return '\u00A3' + s.substring(0, s.length - 2) + '.' + s.substring(s.length - 2);
};
const Product = ({ data }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: data.image }} resizeMode="cover" style={styles.imageView}>
        <View style={styles.info}>
          <View style={{ flexBasis: '80%' }}>
            <Text style={styles.titlePrice}>{data.name}</Text>
            <Text style={styles.titlePrice}>
              {calculatePrice(data)}
            </Text>
          </View>
          <View style={{ flexBasis: '15%', justifyContent: 'center', overflow: 'hidden' }}>
            <Image source={{ uri: 'https://picsum.photos/id/1010/100/100' }} style={{ width: '100%', height: undefined, aspectRatio: 1, borderRadius: 300 }} />
          </View>
          <View style={{ flexBasis: '100%' }}>
            <Text style={styles.short_desc}>{data.short_description}</Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
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
