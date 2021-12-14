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

const sections = Object.values(productsByCategory);
const Market = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        // contentContainerStyle={{ paddingHorizontal: 10 }}
        sections={sections}
        renderSectionHeader={({ section }) => (
          <>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <FlatList
              horizontal
              data={section.data}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Product data={item} />
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
  sectionHeader: {
    paddingTop: 5,
    paddingLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default Market;
