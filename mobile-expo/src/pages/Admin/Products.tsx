import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Product } from '../../core/types/Types';
import { SearchInput, ProductCard } from "../../components";
import { api, getProducts } from '../../services';
import { admin, text } from '../../styles';
const Products = () => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    
    async function fillProducts() {
        setLoading(true);
        const res = await getProducts()
        setLoading(false);
        setProducts(res.data.content);
    
      }

    useEffect(() => {
        fillProducts();
    }, []);


    const data = search.length > 0 ? products.filter((product: Product) =>
        product.name.toLowerCase().includes(
            search.toLowerCase())
    )
        : products;

    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity style={admin.addButton}>
                <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>

            <SearchInput
                placeHolder="Nome do Produto"
                setSearch={setSearch} />


            {
                loading ?
                 (<ActivityIndicator size="large" color="#0000ff" />): 
                    data.map((product: Product) => (
                        <ProductCard key={product.id} {...product} role="admin" />
                  )
                )
            }

        </ScrollView  >
    )

}

export default Products;