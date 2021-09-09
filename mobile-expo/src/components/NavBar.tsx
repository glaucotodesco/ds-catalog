import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import menu from '../assets/menu.png';
import { nav } from '../styles';
import { doLogout, isAutenticated } from '../services/auth';

const NavBar = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [show, setShow] = useState(false);
    const [authenticaded, setAuthenticated] = useState(false);


    useEffect(() => {
        logged();
    }, []);


    async function logged() {
        const result = await isAutenticated();
        result ? setAuthenticated(true) : setAuthenticated(false);
    }


    function navigate(path: any) {
        if (path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    function logout() {
        doLogout();
        navigation.navigate("Login");
    }

    return (

        <>
            {
                authenticaded ?
                    <TouchableOpacity  style={nav.logoutBtn}  onPress={() => logout()} >
                        <Text style={nav.logoutText}> Sair</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={0.8} style={nav.drawer} onPress={() => setShow(!show)}>
                        <Image source={menu} />
                        {
                            show ? (<View style={nav.options}>
                                <TouchableNativeFeedback style={nav.option} onPress={() => navigate('Home')}>
                                    <Text style={[nav.textOption, route.name === "Home" ? nav.textActive : null]}>Home</Text>
                                </TouchableNativeFeedback>

                                <TouchableNativeFeedback style={nav.option} onPress={() => navigate('Catalog')}  >
                                    <Text style={[nav.textOption, route.name === 'Catalog' ? nav.textActive : null]}>Catalogo</Text>
                                </TouchableNativeFeedback>

                                <TouchableNativeFeedback style={nav.option} onPress={() => navigate('Login')}>
                                    <Text style={[nav.textOption, route.name === 'ADM' ? nav.textActive : null]}>ADM</Text>
                                </TouchableNativeFeedback>
                            </View>)
                                :
                                <View />
                        }
                    </TouchableOpacity>
            }
        </>

    );
}

export default NavBar;