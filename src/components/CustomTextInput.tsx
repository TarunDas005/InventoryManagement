import {TextInput} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {Keyboard, StyleSheet} from 'react-native';
import {BLACK, GALLERY, SILVER} from "../constants/AppColors";

interface CustomTextInputProps {
    setUserInput: Function;
    inputKey: any;
    label: string;
    value: string;
    keyboardType?: any
}

const CustomTextInput = ({
                             setUserInput,
                             inputKey,
                             label,
                             value,
                             keyboardType = 'default'
                         }: CustomTextInputProps) => {

    return (
        <TextInput
            mode="outlined"
            style={styles.textInputStyle}
            theme={{colors: {placeholder: SILVER, text: BLACK}}}
            value={value}
            keyboardType={keyboardType}
            onChangeText={text => {
                setUserInput(inputKey, text)
            }}
            label={label}/>
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        fontSize: 13,
        backgroundColor: GALLERY
    }
});


export default CustomTextInput;
