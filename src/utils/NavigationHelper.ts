import {CommonActions} from "@react-navigation/native";
import {NavigationProps} from "../navigators/Application";

interface NavigationHelperProps extends NavigationProps {
    name: string;
    params?: object
}

export function navigate(navigationHelperProps: NavigationHelperProps) {
    navigationHelperProps.navigation.navigate(navigationHelperProps.name, navigationHelperProps.params);
}

export function navigateAndSimpleReset(navigationHelperProps: NavigationHelperProps) {
    let index: number = 0
    navigationHelperProps.navigation.dispatch(
        CommonActions.reset({
            index,
            routes: [{name: navigationHelperProps.name, params: navigationHelperProps.params}],
        }),
    );
}
