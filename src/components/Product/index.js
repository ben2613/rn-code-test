import React, { useRef } from 'react';
import { Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// Get window box for Flat list height
const { height } = Dimensions.get('window');
const avatar_uri = 'https://picsum.photos/id/1010/100/100';

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

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);

const Product = ({ data }) => {
  if (!data.name) {
    return null;
  }
  const scaleAnim = useRef(new Animated.Value(1));
  const scaleUp = () => {
    Animated.timing(scaleAnim.current, {
      toValue: 2,
      duration: 1000,
    }).start();
  };
  return (
    <AnimatedTouchable style={{ transform: [{ scale: scaleAnim.current }, { perspective: 1000 }] }}
      onPress={scaleUp}
    >
      <View style={styles.container}>
        <ImageBackground style={styles.imageView} source={{ uri: data.image }} resizeMode="cover">
          <View style={styles.infoOverlay}>
            <View style={{ flexBasis: '80%' }}>
              <Text style={styles.titlePrice}>
                {data.name}
              </Text>
              <Text style={styles.titlePrice}>
                {calculatePrice(data)}
              </Text>
            </View>
            <View style={{ alignSelf: 'flex-start', flexBasis: '15%', justifyContent: 'center', padding: 6 }}>
              <Image
                style={{ width: '100%', height: undefined, aspectRatio: 1, borderRadius: 300 }}
                source={{ uri: avatar_uri }}
              />
            </View>
            <View style={{ flexBasis: '100%' }}>
              <Text style={styles.short_desc}>{data.short_description}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0.3 * height,
  },
  imageView: {
    justifyContent: "flex-end",
    aspectRatio: 4 / 3,
    height: '100%',
    width: null,
    borderRadius: 15,
    overflow: 'hidden',
  },
  infoOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  titlePrice: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  short_desc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  }
});

export default Product;
