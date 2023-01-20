import {Category, CategoryField} from "../redux/types/product";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BLACK, PURPLE, SILVER, WHITE} from "../constants/AppColors";
import CustomTextInput from "./CustomTextInput";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import {AttributeTypes, TOUCHABLE_OPACITY_ACTIVE_OPACITY} from "../constants/AppConstant";

interface CategoryRowViewProps {
    item: Category
    setUserInput: Function
    pressAddNewField: Function,
    setTitle: Function,
    removeField: Function,
    removeCategory: Function
}

export const CategoryRowView = ({
                                    item,
                                    setUserInput,
                                    pressAddNewField,
                                    setTitle,
                                    removeField,
                                    removeCategory
                                }: CategoryRowViewProps) => (
    <View style={styles.rootStyle}>
        <Text style={styles.titleStyle}>{item.value}</Text>
        <View style={{marginTop: 10}}>
            <CustomTextInput setUserInput={(key: string, value: string) => {
                setUserInput(key, value, item.id, null)
            }} inputKey={item.id} label={item.label} value={item.value}/>

            {
                item.fields && item.fields.length > 0 ?
                    generateFieldView(item.fields, setUserInput, item.id, removeField)
                    : null
            }

            <View style={{marginTop: 5}}>
                {generateTitleMenu(item.fields, item.id, setTitle)}
            </View>

            <View style={styles.bottomButtonRootStyle}>

                {generateAddNewField(pressAddNewField, item.id)}

                <TouchableOpacity style={[styles.buttonRootStyle, {marginStart: 5, flexDirection: 'row'}]}
                                  onPress={() => removeCategory(item.id)}>
                    <Icon name="delete" size={20} color={PURPLE}/>
                    <Text style={[styles.buttonTextStyle, {marginStart: 5}]}>
                        REMOVE
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    </View>
);

const generateTitleMenu = (fields: CategoryField[], categoryId: any, setTitle: Function) => {
    let field: CategoryField | undefined = fields.find(field => field.isTitle)
    let title: string = 'TITLE FIELD: '
    if (field?.isTitle && field?.value !== '') {
        title += field?.value
    } else {
        title += "UNNAMED FIELD"
    }
    return <>
        <Menu>
            <MenuTrigger>
                <View style={styles.buttonStyle}>
                    <Text style={styles.titleFieldTextStyle} numberOfLines={1}>{title.toUpperCase()}</Text>
                </View>
            </MenuTrigger>
            <MenuOptions>
                {
                    fields.map(field => (
                       <View key={field.id.toString()}>
                           <MenuOption onSelect={() => setTitle(categoryId, field.id)}
                                       text={field.value.toUpperCase()}/>
                       </View>
                    ))
                }
            </MenuOptions>
        </Menu>
    </>
}

const generateAddNewField = (pressAddNewField: Function, categoryId: any) => {
    return <>
        <Menu>
            <MenuTrigger>
                <View style={styles.buttonRootStyle}>
                    <Text style={styles.buttonTextStyle}>
                        ADD NEW FIELD
                    </Text>
                </View>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={() => pressAddNewField(AttributeTypes.TEXT, categoryId)}
                            text={AttributeTypes[AttributeTypes.TEXT]}/>
                <MenuOption onSelect={() => pressAddNewField(AttributeTypes.CHECKBOX, categoryId)}
                            text={AttributeTypes[AttributeTypes.CHECKBOX]}/>
                <MenuOption onSelect={() => pressAddNewField(AttributeTypes.DATE, categoryId)}
                            text={AttributeTypes[AttributeTypes.DATE]}/>
                <MenuOption onSelect={() => pressAddNewField(AttributeTypes.NUMBER, categoryId)}
                            text={AttributeTypes[AttributeTypes.NUMBER]}/>
            </MenuOptions>
        </Menu>
    </>
}

const getTitleField = (fields: CategoryField[]) => {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].isTitle && fields[i].value.length > 0) {
            return fields[i].value
        }
    }
    return "Unnamed Field"
}

const generateFieldView = (fields: CategoryField[], setUserInput: Function, categoryId: any, removeField: Function) => {
    return fields.map(field => (
        <View style={styles.fieldRootStyle} key={field.id.toString()}>
            <View style={{flex: 1}}>
                <CustomTextInput setUserInput={(key: string, value: string) => {
                    setUserInput(key, value, categoryId, field.id)
                }} inputKey={field.id} label={field.placeholder} value={field.value}/>
            </View>
            <View style={styles.typeRootStyle}>
                <Text style={styles.typeStyle}>{field.type}</Text>
            </View>

            <TouchableOpacity style={styles.deleteFieldButtonStyle} onPress={() => removeField(categoryId, field.id)}>
                <Icon name="delete" size={20} color={BLACK}/>
            </TouchableOpacity>

        </View>
    ))
}


const styles = StyleSheet.create({
    rootStyle: {
        backgroundColor: WHITE,
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    }, titleStyle: {
        fontSize: 16,
        color: BLACK,
        fontWeight: "500"
    }, fieldRootStyle: {
        flexDirection: 'row',
    }, typeRootStyle: {
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: SILVER,
        marginTop: 6
    }, typeStyle: {
        fontSize: 12,
        color: PURPLE
    }, deleteFieldButtonStyle: {
        marginTop: 6,
        justifyContent: 'center',
        paddingHorizontal: 12,
    }, bottomButtonRootStyle: {
        marginTop: 5,
        flexDirection: 'row'
    }, buttonRootStyle: {
        height: 44,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: SILVER,
        borderRadius: 5
    }, buttonTextStyle: {
        fontSize: 12,
        color: PURPLE
    }, buttonStyle: {
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: PURPLE
    }, titleFieldTextStyle: {
        fontSize: 12,
        color: WHITE,
    }
});
