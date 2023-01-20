import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION_KEY} from './NavigationKey';
import {IndexDashboardContainer, IndexManageCategoriesContainer, IndexCategoryProductContainer} from "../containers";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Dimensions} from "react-native";
import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

const drawerWidth = Math.ceil((Dimensions.get("window").width * 75) / 100);

const RootDrawerScreen = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    width: drawerWidth,
                }
            }}
            drawerContent={props => <DrawerContent props={props}/>}>
            <Drawer.Screen name={NAVIGATION_KEY.DASHBOARD_SCREEN} component={IndexDashboardContainer}
                           options={{headerShown: false}}/>
            <Drawer.Screen name={NAVIGATION_KEY.MANAGE_CATEGORIES_SCREEN} component={IndexManageCategoriesContainer}
                           options={{headerShown: false}}/>
            <Drawer.Screen name={NAVIGATION_KEY.CATEGORY_PRODUCT_SCREEN} component={IndexCategoryProductContainer}
                           options={{headerShown: false}}/>
        </Drawer.Navigator>
    );
};

export default RootDrawerScreen;
