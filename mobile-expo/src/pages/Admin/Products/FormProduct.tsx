import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, ActivityIndicator, Image } from 'react-native';
import arrow from "../../../assets/arrow2.png";
import { theme, text } from "../../../styles";

interface ListProductsProps {
    setScreen: Function;
}

const FormProduct = (props: ListProductsProps) => {

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Computador 1"
        },
        {
            id: 2,
            name: "Computador 2"
        },
        {
            id: 3,
            name: "Computador 3"
        },
        {
            id: 4,
            name: "Computador 4"
        },
    ]);

    const [product, setProduct] = useState({
        name: null,
        description: null,
        imgUrl: null,
        price: null,
        categories: null
    });

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
                                                    setProduct({ ...product, categories: cat.name });
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

                            <TextInput placeholder="Nome do Produto" style={theme.formInput} />
                            
                            <TouchableOpacity 
                                style={theme.selectInput}
                                onPress={() => setShowCategories(!showCategories)}>
                                <Text style={product.categories === null ? {color: "#aeaeae"} : {color: "#000000"} }   >
                                    {product.categories === null ? "Escolha uma categoria" : product.categories}
                                </Text>
                            </TouchableOpacity>

                            <TextInput placeholder="Preço" style={theme.formInput}/>
                            
                            <TouchableOpacity activeOpacity={0.8} style={theme.uploadBtn}>
                                <Text style={text.uploadText}>
                                    Carregar imagem
                                </Text>
                            </TouchableOpacity>
                            <Text style={text.fileSize}>
                                As imagens devem ser  JPG ou PNG e não devem ultrapassar 5Mb.
                            </Text>
                            
                            
                            <TextInput multiline placeholder="Descrição" style={theme.textArea}/>
                            
                            <View style={theme.buttonContainer}>
                                <TouchableOpacity style={theme.deleteBtn}>
                                    <Text style={text.deleteText}>Cancelar</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={theme.saveBtn}>
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