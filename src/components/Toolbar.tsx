import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BLACK, WHITE} from "../constants/AppColors";
import ImageHelper from "../utils/ImageHelper";
import {TOOLBAR_HEIGHT, TOUCHABLE_OPACITY_ACTIVE_OPACITY} from "../constants/AppConstant";

const {drawerIcon} = ImageHelper();

interface ToolbarProps {
    title?: string;
    backgroundColor?: string;
    titleColor?: string;
    navigation?: any
}

const Toolbar = ({
                     title,
                     backgroundColor = WHITE,
                     titleColor = BLACK,
                     navigation
                 }: ToolbarProps) => {
    return (
        <View style={[{backgroundColor: backgroundColor}, styles.rootStyle]}>
            <View style={styles.titleRootStyle}>
                {title ? (
                    <Text style={[styles.titleStyle, {color: titleColor}]}>{title}</Text>
                ) : null}
            </View>

            <TouchableOpacity
                activeOpacity={TOUCHABLE_OPACITY_ACTIVE_OPACITY}
                onPress={() => {
                    navigation.openDrawer()
                }}
                style={{alignSelf: 'flex-start'}}>
                <View style={styles.imageRootStyle}>
                    <Image style={styles.imageStyle} source={drawerIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    rootStyle: {
        paddingRight: 15,
        alignItems: 'center',
        flexDirection: 'row',
        height: TOOLBAR_HEIGHT,
    },
    imageRootStyle: {
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 24,
        height: 18,
        resizeMode: 'stretch',
    },
    titleStyle: {
        fontSize: 16,
        textAlign: 'center',
    },
    titleRootStyle: {
        position: 'absolute',
        height: 64,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
});

export default Toolbar;
