import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import {DOV_GRAY} from "../constants/AppColors";

interface DrawerMenuProps {
    title: string,
    onPress: Function
}

export const DrawerMenu = ({title, onPress}: DrawerMenuProps) => {
    return <TouchableOpacity onPress={() => {
        if (onPress !== null) {
            onPress()
        }
    }} style={styles.rootStyle}>
        <Text style={styles.titleStyle}>
            {title}
        </Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    rootStyle: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    }, titleStyle: {
        flex: 1,
        color: DOV_GRAY,
        fontSize: 16
    }
})
