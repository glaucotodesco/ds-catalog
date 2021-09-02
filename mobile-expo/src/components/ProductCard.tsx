import React from 'react';
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { text, theme } from '../styles';

interface ProductProps {
    id: Number;
    name: String;
    imgUrl: ImageSourcePropType;
    price: Number
}

const ProductCard = (product: ProductProps) => {
    return (
        <View>
            <TouchableOpacity style={theme.productCard}>
                <Image source={product.imgUrl} />
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
