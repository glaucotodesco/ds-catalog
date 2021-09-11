import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Categories, Products, Users } from '..';
import { TabBar } from '../../components';

const DashBoard = () => {

    const [screen, setScreen] = useState("products");
    return (
        <View>
            <TabBar screen={screen} setScreen={setScreen} />
            { screen === 'products'     && <Products />     }
            { screen === 'categories'   && <Categories />   }
            { screen === 'users'        && <Users />        }
        </View>
    )

}

export default DashBoard;