import React, {useState, useEffect} from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import { api } from '../services';
import { theme } from '../styles';
import leftArrow from '../assets/arrow2.png';

const ProductDetails = ( { route: 
                            { params:
                                 {id}
                            }
                         }
 ) => {

  const [product, setProduct] = useState({
      id:null,
      name: null,
      description: null,
      price: null,
      imgUrl: null,
      date: null,
      categories: [],
  });

  const [loading, setLoading] = useState(false);

  async function loadProductData() {
    setLoading(true);
    const res = await api.get(`/products/${id}`);
    setProduct(res.data);
    setLoading(false);
  }

  useEffect(()=> {
    loadProductData();
  },[]);

  return (
        loading ? 
        (<ActivityIndicator size="large"/>)        : 
        (<View >
            <TouchableOpacity>
                <Image source={leftArrow} />
                <Text>Voltar</Text>
            </TouchableOpacity>
            <View>
                 <Image source={{uri: product.imgUrl}} style={{width:150, height:150}}/>
            </View>
            <Text>{product.name}</Text>
            <View style={theme.priceContainer}>
                <Text>R$</Text>
                <Text>{product.price}</Text>
            </View>
            <ScrollView>
                <Text>{product.description}</Text>
                <Text>{product.description}</Text>
                <Text>{product.description}</Text>
                <Text>{product.description}</Text>
                <Text>{product.description}</Text>
            </ScrollView>
        </View>)

   )
};

export default ProductDetails;