import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { text, theme } from '../styles';

interface ProductProps {
    id: number;
    name: string;
    imgUrl: string;
    price: Number
}

const ProductCard = (product: ProductProps) => {
    const navigation = useNavigation();
    
    return (
        <View>
            <TouchableOpacity style={theme.productCard}  onPress={() => navigation.navigate('ProductDetails', { id : product.id} )}>
                <Image source={{ uri: product.imgUrl}}  style={theme.productImage}  />
                <View style={theme.productDescription}>
                    <Text style={text.productName}>{product.name}</Text>
                    <View style={theme.priceContainer}>
                        <Text style={text.currency}>R$</Text>
                        <Text style={text.productPrice}>{product.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    );
}

export default ProductCard;
