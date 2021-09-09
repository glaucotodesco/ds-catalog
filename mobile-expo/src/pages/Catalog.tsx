import React, {useState,useEffect} from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { ProductCard, SearchInput } from '../components';
import { Product } from '../core/types/Types';
import { api } from '../services';
import { theme } from '../styles';


const Catalog = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function fillProducts() {
    setLoading(true);
    const res = await api.get(`/products`);
    setLoading(false);
    setProducts(res.data.content);

  }

  useEffect(()=> {
    fillProducts();
  },[]);

  const data = search.length > 0 ? products.filter((product: Product) => 
                                                    product.name.toLowerCase().includes(
                                                          search.toLowerCase())
                                                  ) 
                                 : products;

  return (
    <ScrollView  contentContainerStyle={theme.scrollContainer}>
      <SearchInput placeHolder="Nome do Produto"  setSearch={setSearch} />
      {
        
        loading ? 
        (<ActivityIndicator size="large"  color="#0000ff" />): 
        data.map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          )
      )}
    </ScrollView>

  );
}

export default Catalog;
