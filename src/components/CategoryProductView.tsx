import {Category, CategoryField, CategoryProductItem, CategoryProductItemValues} from "../redux/types/product";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BLACK, GALLERY, PURPLE, SILVER, WHITE} from "../constants/AppColors";
import CustomTextInput from "./CustomTextInput";
import React from "react";
import {AttributeTypes} from "../constants/AppConstant";
import moment from "moment";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import uuid from "react-native-uuid";

interface CategoryProductViewProps {
    item: CategoryProductItem,
    setUserInput: Function,
    pressDate: Function,
    pressRemoveCategoryProduct: Function
}

export const CategoryProductView = ({
                                        item,
                                        setUserInput,
                                        pressDate,
                                        pressRemoveCategoryProduct
                                    }: CategoryProductViewProps) => (
    <View style={styles.rootStyle}>
        <Text style={styles.titleStyle}>{getTitle(item)}</Text>
        <View style={{marginTop: 10}}>
            {generateInputField(item, setUserInput, item.id, pressDate)}

            <TouchableOpacity style={[styles.buttonRootStyle, {marginStart: 5, flexDirection: 'row'}]}
                              onPress={() => pressRemoveCategoryProduct(item.id)}>
                <Icon name="delete" size={20} color={PURPLE}/>
                <Text style={[styles.buttonTextStyle, {marginStart: 5}]}>
                    REMOVE
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);

const generateInputField = (item: CategoryProductItem, setUserInput: Function, itemId: any, pressDate: Function) => {
    let iItem = item.item
    let views: any = []
    for (let i = 0; i < iItem.length; i++) {
        let field = iItem[i].field
        let value = iItem[i].value
        if (field.type == AttributeTypes[AttributeTypes.TEXT]) {
            views.push(getTextBox(field, value, setUserInput, itemId))
        } else if (field.type == AttributeTypes[AttributeTypes.DATE]) {
            views.push(getDate(field, value, setUserInput, itemId, pressDate))
        } else if (field.type == AttributeTypes[AttributeTypes.NUMBER]) {
            views.push(getTextBox(field, value, setUserInput, itemId, 'numeric'))
        } else if (field.type == AttributeTypes[AttributeTypes.CHECKBOX]) {
            views.push(getCheckBox(field, value, setUserInput, itemId))
        }
    }
    return views;
}

const getDate = (field: CategoryField, value: any, setUserInput: Function, itemId: any, pressDate: Function) => {
    return <TouchableOpacity style={styles.dateBoxRootStyle} onPress={() => {
        pressDate(field.id, value, itemId, field.id)
    }} key={field.id.toString()}>
        <Text style={styles.textStyle}>{
            value && value !== '' ? moment(value).format('YYYY/MM/DD') : field.value
        }</Text>
    </TouchableOpacity>
}

const getTextBox = (field: CategoryField, value: string, setUserInput: Function, itemId: any, keyboardType = 'default') => {
    return <View key={field.id.toString()}>
        <CustomTextInput setUserInput={(key: string, value: string) => {
            setUserInput(key, value, itemId, field.id)
        }} inputKey={field.id} label={field.value} value={value} keyboardType={keyboardType}/>
    </View>
}


const getCheckBox = (field: CategoryField, value: any, setUserInput: Function, itemId: any) => {
    return <View style={styles.checkBoxRootStyle} key={field.id.toString()}>
        <CheckBox
            value={value && value == '' ? false : value}
            onValueChange={(newValue) => {
                setUserInput(field.id, newValue, itemId, field.id)
            }}
        />
        <Text style={[styles.textStyle, {marginStart: 5}]}>
            {field.value}
        </Text>
    </View>
}

const getTitle = (item: CategoryProductItem) => {
    let title = 'Unnamed Field'
    if (item && item.item) {
        let categoryProductItemValues: CategoryProductItemValues[] = item.item
        for (let i = 0; i < categoryProductItemValues.length; i++) {
            let field = categoryProductItemValues[i]
            if (field && field.field.isTitle) {
                if (typeof field.value == 'object') {
                    title = moment(field.value).format('YYYY/MM/DD')
                } else {
                    if (field.value.length > 0)
                        title = field.value
                }
            }
        }
    }
    return title
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
    }, dateBoxRootStyle: {
        height: 45,
        borderWidth: 1,
        borderColor: SILVER,
        backgroundColor: GALLERY,
        marginTop: 5,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 15
    }, checkBoxRootStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    }, textStyle: {
        fontSize: 12
    }, buttonRootStyle: {
        height: 44,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderColor: SILVER,
        borderRadius: 5
    }, buttonTextStyle: {
        fontSize: 12,
        color: PURPLE
    }
});
