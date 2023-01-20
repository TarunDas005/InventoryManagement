import React from "react";
import {
    View,
    StyleSheet,
    Platform,
    SafeAreaView,
    KeyboardAvoidingView, FlatList,
} from "react-native";

import {CustomStatusBar} from "./CustomStatusBar";
import {DrawerMenu} from "./DrawerMenu";
import {DOV_GRAY, WHITE} from "../constants/AppColors";
import {NAVIGATION_KEY} from "../navigators/NavigationKey";
import {navigateAndSimpleReset} from "../utils/NavigationHelper";
import {useSelector} from "react-redux";
import {getCategoriesSelector} from "../redux/selectors/product";
import {Category} from "../redux/types/product";

interface DrawerProps {
    props?: any;
}


const DrawerContent = ({props}: DrawerProps) => {
    const categories = useSelector(getCategoriesSelector);

    const renderCategory = ({item}: { item: Category }) => (
        <DrawerMenu title={item.value} onPress={() => {
            navigateAndSimpleReset({
                name: NAVIGATION_KEY.CATEGORY_PRODUCT_SCREEN,
                params: {
                    categoryId: item.id
                },
                navigation: props.navigation,
            })
        }}/>
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <CustomStatusBar/>
                <View style={styles.rootStyle}>
                    <DrawerMenu title={'Dashboard'} onPress={() => {
                        navigateAndSimpleReset({
                            name: NAVIGATION_KEY.DASHBOARD_SCREEN,
                            navigation: props.navigation,
                        })
                    }}/>

                    <View>
                        <FlatList
                            data={categories}
                            renderItem={renderCategory}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>


                    <DrawerMenu title={'Manage Categories'} onPress={() => {
                        navigateAndSimpleReset({
                            name: NAVIGATION_KEY.MANAGE_CATEGORIES_SCREEN,
                            navigation: props.navigation,
                        })
                    }}/>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: WHITE,
        paddingVertical: 10
    }
})

export default DrawerContent;
