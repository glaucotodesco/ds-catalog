import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, ActivityIndicator, Image, Alert } from 'react-native';
import Toast from 'react-native-tiny-toast';

import arrow from "../../../assets/arrow2.png";
import { createProduct, getCategories } from '../../../services';
import { theme, text } from "../../../styles";

interface ListProductsProps {
    setScreen: Function;
}

const FormProduct = (props: ListProductsProps) => {

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);
        
    const [product, setProduct] = useState({
        name: "",
        description: "",
        imgUrl: "",
        price: 0,
        categories : []
    });

    async function loadCategories() {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data.content);
        setLoading(false);
    }

    function handleSave(){
        !edit && newProduct();
    }

    async function newProduct() {
        for(const [index] of product.categories.entries()){
            delete product.categories[index].name;
        }
        
        setLoading(true);
        try {
            await createProduct(product);
            Toast.showSuccess("Produto criado com sucesso!");
        } catch (error) {
            Toast.show("Erro ao salvar o produto!");
        }
        setLoading(false);
    }
    

    useEffect(() => {loadCategories()},[]);

    return (

        <View style={theme.formContainer}>
            {

                loading ?
                    (<ActivityIndicator size="large" color="#0000ff" />) :
                    <View style={theme.formCard}>
                        <ScrollView>

                            <Modal visible={showCategories}
                                animationType="fade"
                                transparent={true}
                                presentationStyle="overFullScreen"
                            >
                                <View style={theme.modalContainer}>
                                    <ScrollView contentContainerStyle={theme.modalContent}>
                                        {categories.map((cat) => (
                                            <TouchableOpacity
                                                style={theme.modalItem}
                                                key={cat.id}
                                                onPress={() => {
                                                    setProduct({ ...product, categories: [cat] });
                                                    setShowCategories(!showCategories);
                                                }}>
                                                <Text>{cat.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                        }
                                    </ScrollView>
                                </View>
                            </Modal>

                            
                            <TouchableOpacity 
                                onPress={ () => props.setScreen("listProducts")} 
                                style={theme.goBackContainer}>
                                
                                    <Image source={arrow} />
                                    <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>

                            <TextInput placeholder="Nome do Produto" 
                                       style={theme.formInput} 
                                       value={product.name}
                                       onChangeText={ (e) => setProduct({...product, name: e} )}
                            />
                            
                            <TouchableOpacity 
                                style={theme.selectInput}
                                onPress={() => setShowCategories(!showCategories)}>
                                <Text style={product.categories.length === 0 ? {color: "#aeaeae"} : {color: "#000000"} }   >
                                    {product.categories.length === 0 ? "Escolha uma categoria" : product.categories[0].name}
                                </Text>
                            </TouchableOpacity>

                            <TextInput  placeholder="Preço" 
                                        style={theme.formInput}
                                        value={String(product.price)}
                                        onChangeText={ (e) => setProduct({...product, price: parseFloat(e)} )}

                            />
                            
                            <TouchableOpacity activeOpacity={0.8} style={theme.uploadBtn}>
                                <Text style={text.uploadText}>
                                    Carregar imagem
                                </Text>
                            </TouchableOpacity>
                            <Text style={text.fileSize}>
                                As imagens devem ser  JPG ou PNG e não devem ultrapassar 5Mb.
                            </Text>
                            
                            
                            <TextInput  multiline
                                        placeholder="Descrição" 
                                        style={theme.textArea}
                                        value={product.description}
                                        onChangeText={ (e) => setProduct({...product, description: e} )}
                            />
                            
                            <View style={theme.buttonContainer}>
                                <TouchableOpacity   style={theme.deleteBtn}
                                                    onPress={ () => {
                                                        Alert.alert("Deseja cancelar",
                                                                    "Os dados não serão salvos",
                                                                    [
                                                                        {
                                                                            text:"Voltar",
                                                                            style:"cancel"
                                                                        },
                                                                        {
                                                                            text: "Confirma",
                                                                            style: "default",
                                                                            onPress: () => props.setScreen('listProducts')
                                                                        
                                                                        }
                                                                    ]
                                                        )
                                                    }}
                                >
                                    <Text style={text.deleteText}>Cancelar</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity   style={theme.saveBtn}
                                                    onPress={() => handleSave()}
                                >
                                    <Text style={text.saveText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                     </View>
            }
        </View>

    )

}

export default FormProduct;

