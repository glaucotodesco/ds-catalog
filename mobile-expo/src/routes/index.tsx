import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Home, Catalog} from '../pages';

const Stack = createNativeStackNavigator();

const Routes = () => {

    return (
           <Stack.Navigator>
               <Stack.Screen name="Home" component={Home}       />
               <Stack.Screen name="Catalog" component={Catalog} />
           </Stack.Navigator>
    )
}

export default Routes;