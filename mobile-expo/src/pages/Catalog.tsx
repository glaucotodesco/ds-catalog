import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ProductCard } from '../components';
import product from "../assets/product.png";
import { theme } from '../styles';

const products = [
  {
    id: 1,
    imgUrl: product,
    name: "Produto 01",
    price: 100.20
  },
  {
    id: 2,
    imgUrl: product,
    name: "Produto 02",
    price: 100.20
  },
  {
    id: 3,
    imgUrl: product,
    name: "Produto 02",
    price: 100.20
  },
  {
    id: 4,
    imgUrl: product,
    name: "Produto 02",
    price: 100.20
  },
  {
    id: 5,
    imgUrl: product,
    name: "Produto 02",
    price: 100.20
  },
  {
    id: 6,
    imgUrl: product,
    name: "Produto 02",
    price: 100.20
  },
  {
    id: 7,
    imgUrl: product,
    name: "Produto 02",
    price: 100.20
  },
];

const Catalog = () => {
  return (
    <ScrollView  contentContainerStyle={theme.scrollContainer}>
      {
        products.map(product => (
            <ProductCard key={product.id} {...product}/>
          )
      )}
    </ScrollView>

  );
}

export default Catalog;
