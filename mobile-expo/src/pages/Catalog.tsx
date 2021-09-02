import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ProductCard, SearchInput } from '../components';
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
    name: "Produto 03",
    price: 100.20
  },
  {
    id: 4,
    imgUrl: product,
    name: "Produto 04",
    price: 100.20
  },
  {
    id: 5,
    imgUrl: product,
    name: "Produto 05",
    price: 100.20
  },
  {
    id: 6,
    imgUrl: product,
    name: "Produto 06",
    price: 100.20
  },
  {
    id: 7,
    imgUrl: product,
    name: "Produto 07",
    price: 100.20
  },
];

const Catalog = () => {

  const [search, setSearch] = useState("");
  const data = search.length > 0 ? products.filter((product) => 
                                                    product.name.toLowerCase().includes(
                                                          search.toLowerCase())
                                                  ) 
                                 : products;

  return (
    <ScrollView  contentContainerStyle={theme.scrollContainer}>
      <SearchInput placeHolder="Nome do Produto"  setSearch={setSearch} />
      {
        data.map(product => (
            <ProductCard key={product.id} {...product}/>
          )
      )}
    </ScrollView>

  );
}

export default Catalog;
