import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
        <Text>Home</Text>
        <TouchableOpacity style={{
          backgroundColor: "#069",
          padding: 10,
          borderRadius:4,
          width: 150
        }}
        
        onPress={() => navigation.navigate("Catalog")}
        
        >
           <Text>Clique aqui</Text>
        </TouchableOpacity>
    </View>
  );
}

export default Home;
