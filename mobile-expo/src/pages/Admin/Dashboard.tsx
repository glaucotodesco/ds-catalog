import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Categories, FormProduct, ListProducts, Users } from '..';
import { TabBar } from '../../components';

const DashBoard = () => {

    const [screen, setScreen] = useState("listProducts");
    return (
        <View>
            <TabBar screen={screen} setScreen={setScreen} />
            { screen === 'listProducts'     && <ListProducts  setScreen={setScreen}/> }
            { screen === 'newProduct'   && <FormProduct   setScreen={setScreen }/>   }
            { screen === 'categories'   && <Categories />   }
            { screen === 'users'        && <Users />        }
        </View>
    )

}

export default DashBoard;