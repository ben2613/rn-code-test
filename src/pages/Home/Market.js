import React from 'react';
import { FlatList, SafeAreaView, SectionList, StyleSheet, Text } from 'react-native';
import products from '../../../assets/products.json';
import Product from '../../components/Product';

const productsByCategory = {};
products.sort((a, b) => a.order - b.order);
products.forEach((v) => {
  if (typeof (productsByCategory[v.category]) !== "object") {
    productsByCategory[v.category] = {};
    productsByCategory[v.category].title = v.category;
    productsByCategory[v.category].data = [];
  }
  productsByCategory[v.category].data.push(v);
});
console.log(typeof productsByCategory);
const sections = Object.values(productsByCategory);
const Market = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        sections={sections}
        renderSectionHeader={({ section }) => (
          <>
            <Text styles={styles.sectionHeader}>{section.title}</Text>
            <FlatList
              horizontal
              data={section.data}
              keyExtractor={(item, i) => i.toString()}
              renderItem={(item) => (
                <Text>123</Text>
              )}
            />
          </>
        )}
        renderItem={() => {
          return null;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  sectionHeader: {

  },

});

export default Market;
