import React, {useState} from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform, Text, TouchableOpacity, FlatList,
    ScrollView
} from 'react-native';
import {BLACK, MERCURY, PURPLE, WHITE} from "../../constants/AppColors";
import {CustomStatusBar} from "../../components/CustomStatusBar";
import Toolbar from "../../components/Toolbar";
import {NavigationProps} from "../../navigators/Application";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryProductSelector} from "../../redux/selectors/product";
import {addCategoryItem, removeCategoryProduct, setProductInput} from "../../redux/actions/product";
import {CategoryProductItem} from "../../redux/types/product";
import DatePicker from "react-native-date-picker";
import {CategoryProductViewForDashboard} from "../../components/CategoryProductForDashboard";

interface DashboardProps extends NavigationProps {
}

let tKey: any
let tValue: any
let tItemId: any
let tFieldId: any
let tCategoryId: any

const DashboardScreen = ({navigation}: DashboardProps) => {
    const dispatch = useDispatch();
    const categoryProducts = useSelector(getCategoryProductSelector);

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())

    const setUserInput = (key: string, value: string, itemId: any, field: any, categoryId: any) => {
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

    const pressRemoveCategoryId = (itemId: any, categoryId: any) => {
        dispatch(removeCategoryProduct(
            {
                categoryId: categoryId,
                itemId: itemId
            }
        ))
    }

    const pressDate = (key: any, value: any, itemId: any, fieldId: any, categoryId: any) => {
        tKey = key
        tValue = value
        tItemId = itemId
        tFieldId = fieldId
        tCategoryId = categoryId
        if (value && value != '')
            setDate(value)
        setOpen(true)
    }

    const renderCategoryProduct = ({item, categoryId}: { item: CategoryProductItem, categoryId: any }) => (
        <CategoryProductViewForDashboard item={item} setUserInput={setUserInput} pressDate={pressDate}
                                         pressRemoveCategoryProduct={pressRemoveCategoryId} categoryId={categoryId}/>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, backgroundColor: MERCURY}}>
                <CustomStatusBar/>
                <Toolbar title={'Dashboard'} navigation={navigation}/>
                <ScrollView style={{flex: 1}}>
                    <View style={[styles.rootStyle]}>
                        <View style={styles.innerRootStyle}>
                            {
                                categoryProducts.map((categoryProduct, index) => {
                                    return <View key={index.toString()} style={{marginTop: 10}}>
                                        <View style={styles.sectionRootStyle}>
                                            <Text style={styles.titleStyle}>{categoryProduct.category.value}</Text>
                                            <TouchableOpacity style={styles.addNewItemButtonRootStyle} onPress={() => {
                                                dispatch(addCategoryItem({
                                                    categoryId: categoryProduct.category.id
                                                }))
                                            }}>
                                                <Text style={styles.addNewItemTextStyle}>
                                                    ADD NEW ITEM
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            categoryProduct.data && categoryProduct.data.length > 0 ?
                                                <View>
                                                    <FlatList
                                                        removeClippedSubviews={false}
                                                        scrollEnabled={false}
                                                        data={categoryProduct.data}
                                                        renderItem={({item}) => (
                                                            renderCategoryProduct({
                                                                categoryId: categoryProduct.category.id,
                                                                item: item
                                                            })
                                                        )}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    />
                                                </View>

                                                : <Text style={styles.noItemsTextStyle}>
                                                    No items to display
                                                </Text>
                                        }
                                    </View>
                                })
                            }
                        </View>
                    </View>
                </ScrollView>

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
                                categoryId: tCategoryId,
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
        paddingHorizontal: 10,
        paddingVertical: 10
    }, sectionRootStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }, titleStyle: {
        fontSize: 16,
        color: BLACK,
        fontWeight: "500",
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
    }, noItemsTextStyle: {
        fontSize: 12,
        color: BLACK,
        textAlign: 'center',
        marginTop: 10
    }
});

export default DashboardScreen;
