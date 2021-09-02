import React from 'react';
import { View, TextInput } from 'react-native';
import { theme } from '../styles';

interface SearchProps {
    placeHolder: string,
    setSearch: Function;
}

const SearchInput = ({placeHolder, setSearch}: SearchProps) => {



    return (
        <View style={theme.inputContainer}>
            <TextInput style={theme.searchInput}  placeholder={placeHolder}  onChangeText={text => setSearch(text)}/>
        </View>
    )
}

export default SearchInput;

