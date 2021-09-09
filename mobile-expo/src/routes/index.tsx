import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { NavBar } from '../components';
import { Home, Catalog, Login, ProductDetails, DashBoard } from '../pages';

import { colors, nav } from '../styles';



const Stack = createStackNavigator();
const HeaderText = () => <Text style={nav.leftText}>DS Catalog</Text>;

const Routes = () => {

    return (
        
        <Stack.Navigator screenOptions={{
            headerTitle: "",
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerLeft: ()  => <HeaderText/>,
            headerRight: () => <NavBar />
        }}
        >

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Catalog" component={Catalog} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="DashBoard" component={DashBoard} />
        </Stack.Navigator>
      
    )
}

export default Routes;