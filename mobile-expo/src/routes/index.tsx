import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, Catalog} from '../pages';
import ProductDetails from '../pages/ProductDetails';

const Stack = createNativeStackNavigator();

const Routes = () => {

    return (
           <Stack.Navigator>
               <Stack.Screen name="Home" component={Home}       />
               <Stack.Screen name="Catalog" component={Catalog} />
               <Stack.Screen name="ProductDetails" component={ProductDetails} />
           </Stack.Navigator>
    )
}

export default Routes;