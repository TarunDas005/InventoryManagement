import React, {useState} from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform, Text, FlatList, TouchableOpacity,
} from 'react-native';
import {BLACK, MERCURY, PURPLE, SILVER, WHITE} from "../../constants/AppColors";
import {CustomStatusBar} from "../../components/CustomStatusBar";
import Toolbar from "../../components/Toolbar";
import {NavigationProps} from "../../navigators/Application";
import {useDispatch, useSelector} from "react-redux";
import {getCategoriesSelector, getCategoryProductSelector} from "../../redux/selectors/product";
import {Category, CategoryProduct, CategoryProductItem} from "../../redux/types/product";
import {addCategoryItem, removeCategoryProduct, setProductInput} from "../../redux/actions/product";
import {CategoryRowView} from "../../components/CategoryRowView";
import {CategoryProductView} from "../../components/CategoryProductView";
import DatePicker from "react-native-date-picker";

interface DashboardProps extends NavigationProps {
}

let tKey: any
let tValue: any
let tItemId: any
let tFieldId: any

const CategoryProductScreen = ({navigation, route}: DashboardProps) => {
    const categoryId: any = route.params['categoryId'];
    const categories = useSelector(getCategoriesSelector);
    const category: Category | undefined = categories.find((category) => category.id === categoryId)
    const dispatch = useDispatch();
    const categoryProducts = useSelector(getCategoryProductSelector);
    const inDivCategoryProducts: CategoryProduct | undefined = categoryProducts.find((categoryProduct) => categoryProduct.category.id === categoryId)

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())

    const renderCategoryProduct = ({item}: { item: CategoryProductItem }) => (
        <CategoryProductView item={item} setUserInput={setUserInput} pressDate={pressDate}
                             pressRemoveCategoryProduct={pressRemoveCategoryId}/>
    );

    const pressRemoveCategoryId = (itemId: any) => {
        dispatch(removeCategoryProduct(
            {
                categoryId: categoryId,
                itemId: itemId
            }
        ))
    }

    const setUserInput = (key: string, value: string, itemId: any, field: any) => {
        dispatch(
            setProductInput({
                categoryId: categoryId,
                key: key,
                value: value,
                itemId: itemId,
                fieldId: field
            })
        )
    }

    const pressDate = (key: any, value: any, itemId: any, fieldId: any) => {
        tKey = key
        tValue = value
        tItemId = itemId
        tFieldId = fieldId
        if (value && value != '')
            setDate(value)
        setOpen(true)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <CustomStatusBar/>
                <View style={[styles.rootStyle]}>
                    <Toolbar title={category?.value} navigation={navigation}/>
                    <View style={styles.innerRootStyle}>
                        <View style={styles.topViewStyle}>
                            <Text style={styles.categoryTextStyle}>
                                {category?.value}
                            </Text>
                            <TouchableOpacity style={styles.addNewItemButtonRootStyle} onPress={() => {
                                dispatch(addCategoryItem({
                                    categoryId: categoryId
                                }))
                            }}>
                                <Text style={styles.addNewItemTextStyle}>
                                    ADD NEW ITEM
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineStyle}/>

                        {
                            inDivCategoryProducts ? <View style={styles.flatListRootStyle}>
                                <FlatList
                                    removeClippedSubviews={false}
                                    data={inDivCategoryProducts.data}
                                    contentContainerStyle={{paddingBottom: 10}}
                                    renderItem={renderCategoryProduct}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View> : <Text style={styles.noItemsTextStyle}>
                                No items to display
                            </Text>
                        }

                    </View>
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode={'date'}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        dispatch(
                            setProductInput({
                                categoryId: categoryId,
                                key: tKey,
                                value: date,
                                itemId: tItemId,
                                fieldId: tFieldId
                            })
                        )
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: MERCURY,
    }, innerRootStyle: {
        flex: 1,
    }, topViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        paddingHorizontal: 10
    }, categoryTextStyle: {
        fontSize: 15,
        color: BLACK,
        flex: 1
    }, addNewItemButtonRootStyle: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PURPLE,
        borderRadius: 5
    }, addNewItemTextStyle: {
        fontSize: 12,
        color: WHITE
    }, lineStyle: {
        height: 1,
        backgroundColor: 'rgba(175, 175, 175, 0.2)',
        marginTop: 4
    }, noItemsTextStyle: {
        fontSize: 12,
        color: BLACK,
        textAlign: 'center',
        marginTop: 10
    }, flatListRootStyle: {
        marginHorizontal: 10,
        flex: 1
    }
});

export default CategoryProductScreen;
