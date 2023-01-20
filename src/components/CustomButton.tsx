import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {PURPLE, WHITE} from "../constants/AppColors";
import {TOUCHABLE_OPACITY_ACTIVE_OPACITY} from "../constants/AppConstant";


interface CustomButtonProps {
    title: string;
    onPress: Function;
    backgroundColor?: string
}

export const CustomButton = ({title, backgroundColor = PURPLE, onPress}: CustomButtonProps) => {
    return (
        <TouchableOpacity style={[styles.rootStyle, {backgroundColor: PURPLE}]}
                          onPress={() => onPress()}
                          activeOpacity={TOUCHABLE_OPACITY_ACTIVE_OPACITY}>
            <Text style={styles.titleStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    rootStyle: {
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5
    },
    titleStyle: {
        fontSize: 12,
        color: WHITE,
    }
});
