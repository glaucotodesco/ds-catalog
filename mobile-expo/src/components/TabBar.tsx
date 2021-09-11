import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tabbar } from '../styles';

interface TabBarProps{
    screen: string;
    setScreen: Function;
}

const TabBar = (props: TabBarProps) => {

    const {screen, setScreen} = props;

    function changeScreen(page: string) {
        setScreen(page);
    }

    return (
        <View style={tabbar.container}>
            <TouchableOpacity 
                style={[tabbar.pill, screen==='products' && tabbar.pillActive]}
                activeOpacity={0.8}
                onPress={ () => changeScreen("products")}
            >
                <Text style={[tabbar.pillText, screen==='products' && tabbar.pillTextActive]}>
                    Produtos
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[tabbar.pill, screen==='categories' && tabbar.pillActive]}
                activeOpacity={0.8}
                onPress={ () => changeScreen("categories")}
            >
                <Text style={[tabbar.pillText,screen==='categories' && tabbar.pillTextActive]}>
                    Categorias
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[tabbar.pill,screen==='users' && tabbar.pillActive]}
                activeOpacity={0.8}
                onPress={ () => changeScreen("users")}
            >  
                <Text style={[tabbar.pillText,screen==='users' && tabbar.pillTextActive]}>Usuários</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TabBar;

