import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native';
import { text, theme, admin } from '../styles';

interface ProductProps {
    id: number;
    name: string;
    imgUrl: string;
    price: Number;
    role ?:string;
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

                {
                    product.role === 'admin' && (
                       <View style={theme.buttonContainer}>
                            <TouchableOpacity style={theme.deleteBtn}>
                                <Text style={text.deleteText}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.editBtn}>
                                <Text style={text.editText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </TouchableOpacity>
        </View>

    );
}

export default ProductCard;
