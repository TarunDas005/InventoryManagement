import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    FlatList, Text,
} from 'react-native';
import {WHITE, MERCURY} from "../../constants/AppColors";
import {CustomStatusBar} from "../../components/CustomStatusBar";
import Toolbar from "../../components/Toolbar";
import {NavigationProps} from "../../navigators/Application";
import {CustomButton} from "../../components/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {
    pressAddNewCategory,
    pressAddNewCategoryField,
    removeCategoryField, removeCategoryItem,
    setFieldInput,
    setTitleField
} from "../../redux/actions/product";
import {getCategoriesSelector} from "../../redux/selectors/product";
import {CategoryRowView} from "../../components/CategoryRowView";
import {Category} from "../../redux/types/product";
import {AttributeTypes} from "../../constants/AppConstant";

interface CategoriesProps extends NavigationProps {
}

const CategoriesScreen = ({navigation}: CategoriesProps) => {
    const dispatch = useDispatch();
    const categories = useSelector(getCategoriesSelector);

    const setUserInput = (key: string, value: string, categoryId: any, fieldId: any) => {
        dispatch(setFieldInput({
            key: key,
            value: value,
            categoryId: categoryId,
            fieldId: fieldId
        }))
    }

    const pressAddNewField = (type: AttributeTypes, categoryId: any) => {
        dispatch(pressAddNewCategoryField({
            type: type,
            categoryId: categoryId
        }))
    }

    const setTitle = (categoryId: any, fieldId: any) => {
        dispatch(setTitleField({
            categoryId: categoryId,
            fieldId: fieldId
        }))
    }

    const removeField = (categoryId: any, fieldId: any) => {
        dispatch(removeCategoryField({
            categoryId: categoryId,
            fieldId: fieldId
        }))
    }

    const removeCategory = (categoryId: any) => {
        dispatch(removeCategoryItem({
            categoryId: categoryId
        }))
    }

    const renderCategory = ({item}: { item: Category }) => (
        <CategoryRowView item={item} setUserInput={setUserInput} pressAddNewField={pressAddNewField} setTitle={setTitle}
                         removeField={removeField} removeCategory={removeCategory}/>
    );


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <CustomStatusBar/>
                <View style={[styles.rootStyle]}>
                    <Toolbar title={'Manage Categories'} navigation={navigation}/>
                    <View style={styles.innerRootStyle}>
                        <View style={{flex: 1}}>
                            <FlatList
                                removeClippedSubviews={false}
                                data={categories}
                                renderItem={renderCategory}
                                keyExtractor={item => item.id.toString()}
                            />
                        </View>
                        <CustomButton title={'Add New Category'}
                                      onPress={() => {
                                          dispatch(pressAddNewCategory())
                                      }}/>
                    </View>
                </View>
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
        paddingBottom: 10
    }
});

export default CategoriesScreen;
