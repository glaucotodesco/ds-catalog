import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import menu from '../assets/menu.png';
import { nav } from '../styles';

const NavBar = () => {

    const navigation = useNavigation();
    const route = useRoute();


    const [show, setShow] = useState(false);

    function navigate(path: any) {
        if (path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }


    return (
        <TouchableOpacity activeOpacity={0.8} style={nav.drawer} onPress={() => setShow(!show)}>
            <Image source={menu} />
            {
                show ? (<View style={nav.options}>
                    <TouchableNativeFeedback style={nav.option} onPress={() => navigate('Home')}>
                        <Text style={[nav.textOption, route.name === "Home" ? nav.textActive: null]}>Home</Text>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback style={nav.option} onPress={() => navigate('Catalog')}  >
                        <Text style={[nav.textOption,route.name === 'Catalog' ? nav.textActive: null]}>Catalogo</Text>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback style={nav.option} onPress={() => navigate('Login')}>
                        <Text style={[nav.textOption,route.name === 'ADM' ? nav.textActive: null]}>ADM</Text>
                    </TouchableNativeFeedback>
                </View>) 
                :
                <View />
            }
        </TouchableOpacity>
    );
}

export default NavBar;