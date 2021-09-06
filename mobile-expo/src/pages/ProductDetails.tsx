import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { api } from '../services';
import { text, theme } from '../styles';
import leftArrow from '../assets/arrow2.png';
import { useNavigation } from '@react-navigation/core';

const ProductDetails = ({ route:
    { params:
        { id }
    }
}
) => {

    const [product, setProduct] = useState({
        id: null,
        name: null,
        description: null,
        price: null,
        imgUrl: null,
        date: null,
        categories: [],
    });

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    async function loadProductData() {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadProductData();
    }, []);

    return (
        <View style={theme.detailsContainer}>
            {
                loading ?
                    (<ActivityIndicator size="large" />) :
                    (<View style={theme.detailsCard}>
                            <TouchableOpacity style={theme.goBackContainer} onPress={ () => navigation.goBack()} >
                                <Image source={leftArrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <View style={theme.productImageContainer}>
                                <Image source={{ uri: product.imgUrl }} style={theme.productImage} />
                            </View>
                            <Text style={ text.productDetailsName}>{product.name}</Text>
                            <View style={theme.priceContainer}>
                                <Text style="{text.currency}">R$</Text>
                                <Text style={text.productPrice}>{product.price}</Text>
                            </View>
                            <ScrollView style={theme.scroolTextContainer}>
                                <Text style={text.productDescripion}>{product.description}</Text>
                            </ScrollView>
                    </View>)
            }
        </View>

    )
};

export default ProductDetails;